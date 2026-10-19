import { Link } from 'react-router-dom';
import { useTitulo } from '../lib/useTitulo';

export default function FaleConosco() {
  useTitulo('Fale conosco');
  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Fale conosco</h1>
          <p>Redes sociais, voluntariado e oportunidades na ONG.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto12.png" alt="Equipe da ONG" loading="lazy" />
          <div>
            <h2>Redes sociais</h2>
            <p>Fale com a gente pelos canais abaixo.</p>
            <ul className="redes">
              <li><strong>Instagram:</strong> @seuperfil</li>
              <li><strong>Facebook:</strong> /suapagina</li>
              <li><strong>WhatsApp:</strong> (48) 00000-0000</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Participe</h2>
          <div className="duas">
            <div>
              <h3>Seja um voluntário</h3>
              <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
              <p className="cta"><Link className="btn btn-primario" to="/voluntario">Seja um voluntário</Link></p>
            </div>
            <div>
              <h3>Trabalhe conosco</h3>
              <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
              <p className="cta"><Link className="btn btn-primario" to="/trabalhe">Trabalhe conosco</Link></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
