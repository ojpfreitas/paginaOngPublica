import { Link } from 'react-router-dom';
import type { FormCfg } from '../lib/forms';
import { useTitulo } from '../lib/useTitulo';

export default function Enviado({ cfg }: { cfg: FormCfg }) {
  useTitulo(cfg.titulo);
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
          <div className="form-card sucesso" role="status">
            <div className="check" aria-hidden="true">✓</div>
            <h2>Enviado com sucesso</h2>
            <p>{cfg.mensagem}</p>
            <Link className="btn btn-primario" to={cfg.nav}>
              Ok
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
