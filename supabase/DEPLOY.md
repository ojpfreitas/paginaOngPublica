# Publicar: front na Vercel, back no Supabase

O Supabase substitui o backend NestJS: o banco, o login do admin e o armazenamento das fotos
ficam nele, e o front React fala direto com o Supabase. As regras de acesso estão no `schema.sql`.

## 1. Supabase
1. Crie um projeto em supabase.com (região South America – São Paulo).
2. **SQL Editor** → cole o conteúdo de `schema.sql` → **Run**.
3. **Authentication → Users → Add user**: crie o e-mail e a senha do admin.
4. **Authentication → Sign In / Providers**: desligue "Allow new users to sign up".
5. No SQL Editor, rode (com o e-mail do passo 3):
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'SEU_EMAIL_AQUI';
   ```
6. **Project Settings → API Keys**: copie a **Project URL** e a **publishable key** (`sb_publishable_...`).
   Nunca use a *secret key* (nem a `service_role`) no front.

## 2. Front (Vite + React) — variáveis
Arquivo `frontend/.env.local` (e as mesmas na Vercel):
```
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```
Cliente (`frontend/src/lib/supabase.ts`):
```ts
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
```
As imagens dos 6 animais iniciais ficam em `frontend/public/animais/` (as mesmas do repositório atual).

## 3. Vercel
1. Suba o repositório no GitHub e importe na Vercel (**Add New → Project**).
2. **Root Directory**: `frontend`. Framework: Vite (a Vercel detecta).
3. **Environment Variables**: as duas `VITE_...` acima.
4. Crie `frontend/vercel.json` para as rotas do React (`/admin`, `/adocao`...) funcionarem ao recarregar:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
5. **Deploy**. Depois, teste um envio de formulário e o login em `/admin`.

## Limites que vale conhecer
- Os formulários são públicos: o banco valida o conteúdo, mas não impede spam em volume.
  Se virar problema, o próximo passo é um captcha (Cloudflare Turnstile) com uma Edge Function.
- As fotos enviadas pelo público ficam num bucket público com nome aleatório (`envios/<uuid>`).
  Só quem tem o link as vê, mas não são privadas.
- Confira no painel do Supabase o plano e as regras de pausa por inatividade do plano gratuito.
