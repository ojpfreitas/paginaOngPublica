import { Link } from 'react-router-dom';
import { useTitulo } from '../lib/useTitulo';

export default function ComoAjudar() {
  useTitulo('Como ajudar');
  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Como ajudar</h1>
          <p>Doe, apadrinhe ou participe das campanhas. Toda ajuda conta.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto7.png" alt="Voluntários com os animais" loading="lazy" />
          <div>
            <h2>Como ajudar?</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
            <div className="doacao">
              <h3>Opções para doação</h3>
              <p><strong>Conta bancária:</strong> Ag 1010, Conta 00000-00</p>
              <p><strong>Pix:</strong> 00000000000</p>
              <p><strong>Insumos:</strong> ração, itens de higiene e outros.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Campanhas atuais</h2>
          <div className="campanhas">
            <article className="campanha">
              <img src="/imagens/foto9.png" alt="Campanha atual" loading="lazy" />
              <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
            </article>
            <article className="campanha">
              <img src="/imagens/foto10.png" alt="Campanha atual" loading="lazy" />
              <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho inverso">
          <img src="/imagens/foto8.png" alt="Animal apadrinhado" loading="lazy" />
          <div>
            <h2>Programa de padrinhos</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
            <p className="cta"><Link className="btn btn-primario" to="/apadrinhar">Apadrinhar um animal</Link></p>
          </div>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Informações e serviços</h2>
          <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
        </div>
      </section>
    </>
  );
}
