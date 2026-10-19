-- =====================================================================
-- Animal ONG — banco, segurança (RLS) e storage no Supabase
-- Cole tudo no SQL Editor do painel do Supabase e execute uma vez.
-- =====================================================================

-- ---------- Admins ----------
-- Quem estiver nesta tabela (e logado no Supabase Auth) é administrador.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;  -- sem policies: a API não lê nem escreve aqui

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $fn$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$fn$;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------- Animais ----------
create table public.animals (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 1 and 60),
  especie text not null check (especie in ('Cão', 'Gato', 'Outro')),
  sexo text not null check (sexo in ('Macho', 'Fêmea')),
  idade text check (char_length(idade) <= 30),
  descricao text not null check (char_length(descricao) between 1 and 500),
  foto_url text,
  disponivel boolean not null default true,
  criado_em timestamptz not null default now()
);
alter table public.animals enable row level security;

grant select on public.animals to anon;
grant select, insert, update, delete on public.animals to authenticated;

create policy "animais: público vê os disponíveis" on public.animals
  for select to anon, authenticated
  using (disponivel or (select public.is_admin()));
create policy "animais: admin cria" on public.animals
  for insert to authenticated with check ((select public.is_admin()));
create policy "animais: admin edita" on public.animals
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "animais: admin remove" on public.animals
  for delete to authenticated using ((select public.is_admin()));

-- ---------- Envios dos formulários ----------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('adocao', 'apadrinhar', 'voluntario', 'trabalhe', 'compartilhar')),
  nome text,
  email text,
  celular text,
  dados jsonb not null default '{}'::jsonb,
  foto_path text,
  status text not null default 'novo' check (status in ('novo', 'em_analise', 'aprovado', 'recusado')),
  criado_em timestamptz not null default now()
);
alter table public.submissions enable row level security;

-- Validação no banco: como o site é público, não dá para confiar só no formulário.
create or replace function public.validar_submission()
returns trigger
language plpgsql
set search_path = ''
as $fn$
declare
  permitidos text[];
  k text;
  v text;
  limpo jsonb := '{}'::jsonb;
begin
  new.status := 'novo';
  new.nome := nullif(btrim(new.nome), '');
  new.email := nullif(btrim(new.email), '');
  new.celular := nullif(btrim(new.celular), '');

  if char_length(coalesce(new.nome, '')) > 120
     or char_length(coalesce(new.email, '')) > 200
     or char_length(coalesce(new.celular, '')) > 30 then
    raise exception 'Campo muito longo.';
  end if;
  if new.email is not null and new.email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'E-mail inválido.';
  end if;
  if jsonb_typeof(new.dados) <> 'object' then
    raise exception 'Dados inválidos.';
  end if;

  case new.tipo
    when 'adocao', 'apadrinhar' then permitidos := array['endereco', 'cidade', 'cep', 'animal'];
    when 'voluntario' then permitidos := array['cidade', 'ajuda'];
    when 'trabalhe' then permitidos := array['cidade', 'area', 'experiencia'];
    else permitidos := array['legenda'];
  end case;

  if new.tipo = 'compartilhar' then
    if new.foto_path is null
       or new.foto_path !~ '^envios/[0-9a-f-]{36}\.(jpg|png|webp)$' then
      raise exception 'Foto inválida.';
    end if;
  else
    new.foto_path := null;
    if new.nome is null or new.email is null or new.celular is null then
      raise exception 'Nome, e-mail e celular são obrigatórios.';
    end if;
  end if;

  -- mantém só as chaves esperadas, como texto limpo e com limite de tamanho
  for k, v in select key, value from jsonb_each_text(new.dados) loop
    if k = any (permitidos) then
      v := btrim(v);
      if v <> '' then
        if char_length(v) > (case when k in ('ajuda', 'experiencia') then 2000
                                  when k = 'legenda' then 500 else 200 end) then
          raise exception 'O campo % está muito longo.', k;
        end if;
        limpo := limpo || jsonb_build_object(k, v);
      end if;
    end if;
  end loop;

  if new.tipo <> 'compartilhar' then
    foreach k in array permitidos loop
      if not (limpo ? k) then
        raise exception 'Campo obrigatório ausente: %.', k;
      end if;
    end loop;
  end if;

  new.dados := limpo;
  return new;
end;
$fn$;

create trigger submissions_validar
  before insert on public.submissions
  for each row execute function public.validar_submission();

grant insert on public.submissions to anon, authenticated;
grant select, update, delete on public.submissions to authenticated;

create policy "envios: qualquer pessoa pode enviar" on public.submissions
  for insert to anon, authenticated with check (true);  -- o trigger valida o conteúdo
create policy "envios: admin lê" on public.submissions
  for select to authenticated using ((select public.is_admin()));
create policy "envios: admin atualiza" on public.submissions
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "envios: admin remove" on public.submissions
  for delete to authenticated using ((select public.is_admin()));

-- Galeria pública: só fotos aprovadas e só colunas seguras (sem nome, e-mail ou celular).
-- A view roda com os direitos do dono de propósito; o aviso do Security Advisor é esperado.
create view public.galeria as
  select id, foto_path, dados ->> 'legenda' as legenda, criado_em
  from public.submissions
  where tipo = 'compartilhar' and status = 'aprovado';
grant select on public.galeria to anon, authenticated;

-- ---------- Storage (fotos) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos', 'fotos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Visitantes só podem enviar para envios/<uuid>.<jpg|png|webp>
create policy "fotos: visitantes enviam para envios/" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'fotos' and name ~ '^envios/[0-9a-f-]{36}\.(jpg|png|webp)$');
create policy "fotos: admin gerencia" on storage.objects
  for all to authenticated
  using (bucket_id = 'fotos' and (select public.is_admin()))
  with check (bucket_id = 'fotos' and (select public.is_admin()));

-- ---------- Animais iniciais (os 6 da página HTML) ----------
insert into public.animals (nome, especie, sexo, idade, descricao, foto_url, criado_em)
select t.nome, 'Cão', t.sexo, t.idade, t.descricao, t.foto, now() + t.n * interval '1 second'
from (values
  (1, 'Bob',      'Macho', '2 anos', 'Carinhoso, adora brincar e convive bem com outros cães.', '/animais/animal1.jpeg'),
  (2, 'Scooby',   'Macho', '3 anos', 'Calmo, ótimo para apartamento e muito companheiro.',      '/animais/animal2.jpg'),
  (3, 'Toby',     'Macho', '1 ano',  'Brincalhão e adora crianças.',                            '/animais/animal3.webp'),
  (4, 'Lina',     'Fêmea', '2 anos', 'Calma e muito dócil, ideal para companhia.',               '/animais/animal4.webp'),
  (5, 'Rockie',   'Macho', '1 ano',  'Calmo e muito dócil, ideal para companhia.',              '/animais/animal5.webp'),
  (6, 'Lindinha', 'Fêmea', '3 anos', 'Calma e muito dócil, ideal para companhia.',               '/animais/animal6.webp')
) as t (n, nome, sexo, idade, descricao, foto)
where not exists (select 1 from public.animals);

-- ---------- Primeiro admin (rode DEPOIS de criar o usuário em Authentication → Users) ----------
-- insert into public.admins (user_id) select id from auth.users where email = 'SEU_EMAIL_AQUI';
