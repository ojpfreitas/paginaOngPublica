import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Enviado from './components/Enviado';
import FormPage from './components/FormPage';
import Layout from './components/Layout';
import { FORMS } from './lib/forms';
import Adocao from './pages/Adocao';
import ComoAjudar from './pages/ComoAjudar';
import DicasCuidados from './pages/DicasCuidados';
import Eventos from './pages/Eventos';
import FaleConosco from './pages/FaleConosco';
import Home from './pages/Home';
import Sobre from './pages/Sobre';

function NaoEncontrada() {
  return (
    <section className="bloco">
      <div className="wrap">
        <h2>Página não encontrada</h2>
        <p className="cta">
          <Link className="btn btn-primario" to="/">
            Voltar para a home
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/adocao" element={<Adocao />} />
          <Route path="/como-ajudar" element={<ComoAjudar />} />
          <Route path="/dicas-e-cuidados" element={<DicasCuidados />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
          {FORMS.flatMap((cfg) => [
            <Route key={cfg.path} path={cfg.path} element={<FormPage cfg={cfg} />} />,
            <Route key={cfg.path + '/enviado'} path={`${cfg.path}/enviado`} element={<Enviado cfg={cfg} />} />,
          ])}
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
