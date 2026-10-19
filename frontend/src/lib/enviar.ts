import { supabase } from './supabase';

const EXTENSOES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

export async function enviarFormulario(tipo: string, form: FormData) {
  let foto_path: string | null = null;

  if (tipo === 'compartilhar') {
    const arquivo = form.get('foto');
    if (!(arquivo instanceof File) || !arquivo.size) throw new Error('Escolha uma foto.');
    const ext = EXTENSOES[arquivo.type];
    if (!ext) throw new Error('Use uma foto JPG, PNG ou WEBP.');
    if (arquivo.size > 5 * 1024 * 1024) throw new Error('A foto deve ter até 5 MB.');
    foto_path = `envios/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('fotos').upload(foto_path, arquivo, { contentType: arquivo.type });
    if (error) throw new Error('Não foi possível enviar a foto. Tente novamente.');
  }

  const campos: Record<string, string> = {};
  form.forEach((valor, chave) => {
    if (typeof valor === 'string') campos[chave] = valor.trim();
  });
  const { nome, email, celular, ...dados } = campos;

  // Sem .select(): o público pode inserir, mas não ler a tabela.
  const { error } = await supabase
    .from('submissions')
    .insert({ tipo, nome: nome || null, email: email || null, celular: celular || null, dados, foto_path });
  if (error) throw new Error('Não foi possível enviar. Confira os campos e tente novamente.');
}
