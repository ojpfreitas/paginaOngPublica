import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useTitulo } from '../lib/useTitulo';

export default function Adocao() {
  useTitulo('Adoção');
  const [animais, setAnimais] = useState<Animal[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    supabase
      .from('animals')
      .select('*')
      .eq('disponivel', true)
      .order('criado_em')
      .then(({ data, error }) => {
        if (error) setErro(true);
        else setAnimais(data as Animal[]);
      });
  }, []);

  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Adoção</h1>
          <p>Conheça quem está esperando uma família e veja como adotar.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Como adotar?</h2>
          <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Requisitos para adoção</h2>
          <ul className="requisitos">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>Requisito de exemplo {n}. Substitua pelo requisito real.</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Disponíveis para adoção</h2>
          {erro && <p className="erro">Não foi possível carregar os animais agora. Tente novamente em instantes.</p>}
          {!erro && animais === null && <p>Carregando…</p>}
          {animais && animais.length === 0 && <p>No momento não há animais disponíveis para adoção.</p>}
          {animais && animais.length > 0 && (
            <div className="animais">
              {animais.map((a) => (
                <article className="animal" key={a.id}>
                  {a.foto_url && <img src={a.foto_url} alt={`Foto de ${a.nome}`} loading="lazy" />}
                  <div>
                    <h3>{a.nome}</h3>
                    <p className="meta">
                      {a.sexo}
                      {a.idade ? ` · ${a.idade}` : ''}
                    </p>
                    <p>{a.descricao}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className="cta centro">
            <Link className="btn btn-primario" to="/adotar">
              Quero adotar
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
