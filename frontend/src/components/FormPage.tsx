import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enviarFormulario } from '../lib/enviar';
import type { Campo, FormCfg } from '../lib/forms';
import { supabase } from '../lib/supabase';
import { useTitulo } from '../lib/useTitulo';

function CampoForm({ c }: { c: Campo }) {
  const req = c.req !== false;
  return (
    <div className="campo">
      <label htmlFor={c.id}>
        {c.label}
        {!req && <small> (opcional)</small>}
      </label>
      {c.tipo === 'textarea' ? (
        <textarea id={c.id} name={c.id} required={req} />
      ) : (
        <input
          id={c.id}
          name={c.id}
          type={c.tipo ?? 'text'}
          autoComplete={c.ac}
          required={req}
          pattern={c.pattern}
          title={c.title}
          accept={c.tipo === 'file' ? 'image/jpeg,image/png,image/webp' : undefined}
          list={c.animais ? 'animais' : undefined}
        />
      )}
    </div>
  );
}

export default function FormPage({ cfg }: { cfg: FormCfg }) {
  useTitulo(cfg.titulo);
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [nomes, setNomes] = useState<string[]>([]);
  const usaAnimais = cfg.campos.flat().some((c) => c.animais);

  useEffect(() => {
    if (!usaAnimais) return;
    supabase
      .from('animals')
      .select('nome')
      .eq('disponivel', true)
      .order('criado_em')
      .then(({ data }) => setNomes((data ?? []).map((a) => a.nome as string)));
  }, [usaAnimais]);

  async function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await enviarFormulario(cfg.tipo, new FormData(e.currentTarget));
      navigate(`${cfg.path}/enviado`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.');
      setEnviando(false);
    }
  }

  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>{cfg.titulo}</h1>
          <p>{cfg.sub}</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <div className="form-card">
            <h2>{cfg.h}</h2>
            <p className="intro">{cfg.intro}</p>
            <form onSubmit={aoEnviar}>
              {cfg.campos.map((item, i) =>
                Array.isArray(item) ? (
                  <div className="grade-2" key={i}>
                    {item.map((c) => (
                      <CampoForm key={c.id} c={c} />
                    ))}
                  </div>
                ) : (
                  <CampoForm key={item.id} c={item} />
                ),
              )}
              {usaAnimais && (
                <datalist id="animais">
                  {nomes.map((n) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              )}
              {erro && (
                <p className="erro" role="alert">
                  {erro}
                </p>
              )}
              <div className="form-acoes">
                <button className="btn btn-primario" type="submit" disabled={enviando}>
                  {enviando ? 'Enviando…' : 'Enviar'}
                </button>
                <Link className="btn btn-secundario" to={cfg.nav}>
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
