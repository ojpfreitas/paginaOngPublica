import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !chave) {
  throw new Error('Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env.local (veja .env.example).');
}

export const supabase = createClient(url, chave);

export const urlFoto = (caminho: string) => supabase.storage.from('fotos').getPublicUrl(caminho).data.publicUrl;
