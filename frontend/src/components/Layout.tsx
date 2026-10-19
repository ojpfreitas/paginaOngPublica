import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FORMS } from '../lib/forms';
import Footer from './Footer';

const NAV = [
  { to: '/', nome: 'Home' },
  { to: '/sobre', nome: 'Sobre' },
  { to: '/adocao', nome: 'Adoção' },
  { to: '/como-ajudar', nome: 'Como ajudar' },
  { to: '/dicas-e-cuidados', nome: 'Dicas e cuidados' },
  { to: '/eventos', nome: 'Eventos' },
  { to: '/fale-conosco', nome: 'Fale conosco', destaque: true },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    setAberto(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // nos formulários, destaca a página de origem no menu
  const form = FORMS.find((f) => pathname === f.path || pathname.startsWith(f.path + '/'));
  const secao = form ? form.nav : pathname;
  const ativo = (to: string) => (to === '/' ? secao === '/' : secao === to || secao.startsWith(to + '/'));

  return (
    <>
      <header className="topo">
        <div className="wrap">
          <Link to="/" aria-label="Página inicial">
            <img className="logo" src="/logos/logo-ong.png" alt="Logo da ONG" />
          </Link>
          <button className="hamburguer" aria-expanded={aberto} aria-controls="menu" onClick={() => setAberto(!aberto)}>
            Menu
          </button>
          <nav aria-label="Principal">
            <ul className={'menu' + (aberto ? ' aberto' : '')} id="menu">
              {NAV.map((i) => (
                <li key={i.to} className={i.destaque ? 'doar' : undefined}>
                  <Link to={i.to} aria-current={ativo(i.to) ? 'page' : undefined}>
                    {i.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
