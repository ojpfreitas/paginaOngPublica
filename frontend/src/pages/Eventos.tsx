import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, urlFoto } from '../lib/supabase';
import type { FotoGaleria } from '../lib/types';
import { useTitulo } from '../lib/useTitulo';

const FIXAS = Array.from({ length: 10 }, (_, i) => ({ src: `/imagens/foto${i + 1}.png`, alt: `Foto ${i + 1} da galeria de eventos` }));

export default function Eventos() {
  useTitulo('Eventos');
  const [enviadas, setEnviadas] = useState<FotoGaleria[]>([]);

  useEffect(() => {
    supabase
      .from('galeria')
      .select('id, foto_path, legenda')
      .order('criado_em', { ascending: false })
      .then(({ data }) => setEnviadas((data ?? []) as FotoGaleria[]));
  }, []);

  return (
    <>
      <section className="titulo-pagina">
        <div className="wrap">
          <h1>Eventos</h1>
          <p>Feiras de adoção, campanhas e encontros da ONG.</p>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Eventos</h2>
          <img className="banner" src="/imagens/foto11.png" alt="Evento da ONG" />
          <p>Texto de exemplo. Substitua pelo conteúdo real da ONG.</p>
        </div>
      </section>
      <section className="bloco papel">
        <div className="wrap">
          <h2>Galeria de fotos</h2>
          <div className="galeria">
            {enviadas.map((f) => (
              <img key={f.id} src={urlFoto(f.foto_path)} alt={f.legenda ?? 'Foto enviada por um visitante'} loading="lazy" />
            ))}
            {FIXAS.map((f) => (
              <img key={f.src} src={f.src} alt={f.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </section>
      <section className="bloco">
        <div className="wrap">
          <h2>Compartilhe um momento</h2>
          <p className="intro">Esteve em um evento? Envie sua foto e conte como foi.</p>
          <p className="cta">
            <Link className="btn btn-primario" to="/compartilhar">
              Compartilhar um momento
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
