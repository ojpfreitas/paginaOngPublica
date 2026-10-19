import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="wrap">
        <div>
          <h3>Animal ONG</h3>
          <p>Anim@al ponto.com</p>
          <p>CNPJ 01.030.234/0001-42</p>
          <p>Rua , 123<br />Criciúma-SC, CEP 888.00-000</p>
        </div>
        <div>
          <h3>Navegue</h3>
          <ul>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/adocao">Adoção</Link></li>
            <li><Link to="/dicas-e-cuidados">Dicas e cuidados</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
          </ul>
        </div>
        <div>
          <h3>Participe</h3>
          <ul>
            <li><Link to="/voluntario">Seja voluntário</Link></li>
            <li><Link to="/apadrinhar">Apadrinhe</Link></li>
            <li><Link to="/trabalhe">Trabalhe conosco</Link></li>
            <li><Link to="/fale-conosco">Fale conosco</Link></li>
          </ul>
        </div>
        <p className="fim">Desenvolvido por</p>
      </div>
    </footer>
  );
}
