export type Animal = {
  id: string;
  nome: string;
  especie: string;
  sexo: string;
  idade: string | null;
  descricao: string;
  foto_url: string | null;
  disponivel: boolean;
};

export type FotoGaleria = { id: string; foto_path: string; legenda: string | null };
