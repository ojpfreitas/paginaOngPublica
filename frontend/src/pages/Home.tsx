import { Link } from 'react-router-dom';
import { useTitulo } from '../lib/useTitulo';

export default function Home() {
  useTitulo('Home');
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Todo animal merece um lar.</h1>
            <p>Resgatamos, cuidamos e encontramos famílias para animais abandonados em Criciúma e região.</p>
            <div className="acoes"> <Link className="btn btn-primario" to="/adocao">Quero adotar</Link> <Link className="btn btn-contorno" to="/como-ajudar">Como ajudar</Link> </div>
          </div>
          <div className="hero-foto">
            <img src="/imagens/foto1.png" alt="Animal resgatado pela ONG" />
            <div className="selo"><strong>400</strong>animais adotados</div>
          </div>
        </div>
      </section>
      <section className="numeros" aria-label="Nosso impacto">
        <div className="wrap">
          <ul>
            <li><strong>7.000</strong><span>animais resgatados</span></li>
            <li><strong>400</strong><span>animais adotados</span></li>
            <li><strong>500</strong><span>consultas e procedimentos</span></li>
          </ul>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto2.png" alt="Equipe cuidando dos animais" loading="lazy" />
          <div>
            <h2>Conheça nosso trabalho</h2>
            <p>Cada animal que chega passa por atendimento veterinário, vacinação e castração antes de ir para a adoção. Nosso trabalho depende de voluntários, padrinhos e doações.</p>
            <p><Link className="link" to="/sobre">Saiba mais sobre a ONG</Link></p>
          </div>
        </div>
      </section>
      <section className="bloco ajudar">
        <div className="wrap">
          <h2>Como você pode ajudar</h2>
          <p className="intro">Escolha a forma que cabe na sua rotina. Todas fazem diferença.</p>
          <ul>
            <li>
              <Link to="/adotar">
                <h3>Adotar</h3>
                <p>Dê um lar a um cão ou gato que já foi cuidado pela nossa equipe.</p>
                <span className="ir">Quero adotar</span>
              </Link>
            </li>
            <li>
              <Link to="/apadrinhar">
                <h3>Apadrinhar</h3>
                <p>Ajude com uma contribuição mensal para a alimentação e a saúde de um animal.</p>
                <span className="ir">Quero apadrinhar</span>
              </Link>
            </li>
            <li>
              <Link to="/voluntario">
                <h3>Ser voluntário</h3>
                <p>Doe algumas horas para passeios, limpeza, eventos e transporte.</p>
                <span className="ir">Quero ajudar</span>
              </Link>
            </li>
            <li>
              <Link to="/compartilhar">
                <h3>Compartilhar</h3>
                <p>Divulgue os animais disponíveis e ajude a encontrar novos tutores.</p>
                <span className="ir">Quero divulgar</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Notícias</h2>
          <p className="intro">Novidades da ONG, resultados de eventos e histórias de adoção.</p>
          <div className="noticias">
            <article className="noticia">
              <time dateTime="2026-10-01">1 de outubro de 2026</time>
              <h3>Título da notícia</h3>
              <p>Resumo curto da notícia. Substitua este texto pelo conteúdo real.</p>
            </article>
            <article className="noticia">
              <time dateTime="2026-09-15">15 de setembro de 2026</time>
              <h3>Título da notícia</h3>
              <p>Resumo curto da notícia. Substitua este texto pelo conteúdo real.</p>
            </article>
            <article className="noticia">
              <time dateTime="2026-09-02">2 de setembro de 2026</time>
              <h3>Título da notícia</h3>
              <p>Resumo curto da notícia. Substitua este texto pelo conteúdo real.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
