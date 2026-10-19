import { useTitulo } from '../lib/useTitulo';

export default function DicasCuidados() {
  useTitulo('Dicas e cuidados');
  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Dicas e cuidados</h1>
          <p>Informações para cuidar bem dos animais e saber como agir.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto4.png" alt="Cuidados com animais" loading="lazy" />
          <div>
            <h2>Guia de primeiros socorros</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
          </div>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap trabalho inverso">
          <img src="/imagens/foto5.png" alt="Animal em situação de risco" loading="lazy" />
          <div>
            <h2>Denúncia de maus-tratos</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
          </div>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap trabalho">
          <img src="/imagens/foto6.png" alt="Animal procurando o tutor" loading="lazy" />
          <div>
            <h2>Animais perdidos e encontrados</h2>
            <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
          </div>
        </div>
      </section>
    </>
  );
}
