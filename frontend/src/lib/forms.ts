export type Campo = {
  id: string;
  label: string;
  tipo?: 'text' | 'email' | 'tel' | 'file' | 'textarea';
  ac?: string;
  req?: boolean;
  pattern?: string;
  title?: string;
  animais?: boolean; // sugere os nomes dos animais cadastrados
};

export type FormCfg = {
  tipo: 'adocao' | 'apadrinhar' | 'voluntario' | 'trabalhe' | 'compartilhar';
  path: string; // rota do formulário; a confirmação fica em `${path}/enviado`
  nav: string; // item do menu que fica destacado
  titulo: string;
  sub: string;
  h: string;
  intro: string;
  campos: (Campo | Campo[])[]; // um array vira uma linha com 2 colunas
  mensagem: string;
};

const CONTATO: Campo[] = [
  { id: 'nome', label: 'Nome completo', ac: 'name' },
  { id: 'email', label: 'E-mail', tipo: 'email', ac: 'email' },
  { id: 'celular', label: 'Celular', tipo: 'tel', ac: 'tel' },
];
const ENDERECO: (Campo | Campo[])[] = [
  { id: 'endereco', label: 'Endereço', ac: 'street-address' },
  [
    { id: 'cidade', label: 'Cidade', ac: 'address-level2' },
    { id: 'cep', label: 'CEP', ac: 'postal-code', pattern: '[0-9]{5}-?[0-9]{3}', title: 'Digite o CEP com 8 números' },
  ],
  { id: 'animal', label: 'Animal de preferência', animais: true },
];

export const FORMS: FormCfg[] = [
  {
    tipo: 'adocao', path: '/adotar', nav: '/adocao',
    titulo: 'Formulário de adoção', sub: 'Preencha seus dados e escolha o animal que quer conhecer.',
    h: 'Dados para adoção', intro: 'Usaremos essas informações para entrar em contato.',
    campos: [...CONTATO, ...ENDERECO],
    mensagem: 'Recebemos o seu pedido de adoção. Obrigado por querer dar um lar a um animal.',
  },
  {
    tipo: 'apadrinhar', path: '/apadrinhar', nav: '/como-ajudar',
    titulo: 'Apadrinhar um animal', sub: 'Contribua todo mês com a alimentação e a saúde de um animal.',
    h: 'Dados para apadrinhar', intro: 'Conte quem você é e qual animal quer apadrinhar.',
    campos: [...CONTATO, ...ENDERECO],
    mensagem: 'Recebemos o seu pedido de apadrinhamento. Obrigado por ajudar.',
  },
  {
    tipo: 'voluntario', path: '/voluntario', nav: '/fale-conosco',
    titulo: 'Seja um voluntário', sub: 'Doe algumas horas e ajude no dia a dia da ONG.',
    h: 'Cadastro de voluntário', intro: 'Conte como você gostaria de ajudar.',
    campos: [
      ...CONTATO,
      { id: 'cidade', label: 'Cidade', ac: 'address-level2' },
      { id: 'ajuda', label: 'Como você gostaria de ajudar e quando tem disponibilidade?', tipo: 'textarea' },
    ],
    mensagem: 'Recebemos o seu cadastro de voluntário. Obrigado por se juntar a nós.',
  },
  {
    tipo: 'trabalhe', path: '/trabalhe', nav: '/fale-conosco',
    titulo: 'Trabalhe conosco', sub: 'Envie seus dados para participar de futuras oportunidades.',
    h: 'Cadastro para trabalhar na ONG', intro: 'Fale um pouco sobre você.',
    campos: [
      ...CONTATO,
      { id: 'cidade', label: 'Cidade', ac: 'address-level2' },
      { id: 'area', label: 'Área de interesse' },
      { id: 'experiencia', label: 'Experiência e formação', tipo: 'textarea' },
    ],
    mensagem: 'Recebemos o seu cadastro. Obrigado pelo interesse em trabalhar com a gente.',
  },
  {
    tipo: 'compartilhar', path: '/compartilhar', nav: '/eventos',
    titulo: 'Compartilhe um momento', sub: 'Mande a foto de um evento ou de um animal adotado.',
    h: 'Enviar foto', intro: 'A foto poderá aparecer na galeria de eventos depois de aprovada.',
    campos: [
      { id: 'nome', label: 'Seu nome', ac: 'name', req: false },
      { id: 'foto', label: 'Foto (JPG, PNG ou WEBP, até 5 MB)', tipo: 'file' },
      { id: 'legenda', label: 'Conte como foi esse momento', tipo: 'textarea', req: false },
    ],
    mensagem: 'Recebemos a sua foto. Obrigado por compartilhar esse momento.',
  },
];
