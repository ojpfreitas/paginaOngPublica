import { useTitulo } from '../lib/useTitulo';

export default function Sobre() {
  useTitulo('Sobre a ONG');
  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Sobre a ONG</h1>
          <p>Quem somos, o que defendemos e quem caminha com a gente.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto3.png" alt="Equipe da ONG" loading="lazy" />
          <div>
            <h2>Nossa história</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG. Conte como a ONG nasceu, quando começou e quem esteve nessa jornada.</p>
          </div>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Missão e valores</h2>
          <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Nossos parceiros</h2>
          <p className="intro">Empresas que ajudam a manter o trabalho da ONG.</p>
          <ul className="parceiros">
            <li><img src="/logos/lobo-bb.png" alt="Parceiro" loading="lazy" /></li>
            <li><img src="/logos/logo-caixa.png" alt="Caixa" loading="lazy" /></li>
            <li><img src="/logos/logo-pedigre.png" alt="Pedigree" loading="lazy" /></li>
            <li><img src="/logos/logo-whiskas.png" alt="Whiskas" loading="lazy" /></li>
            <li><img src="/logos/logo-supra.png" alt="Supra" loading="lazy" /></li>
            <li><img src="/logos/logo-golden.png" alt="Golden" loading="lazy" /></li>
          </ul>
        </div>
      </section>
    </>
  );
}
