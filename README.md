# Animal ONG

- `frontend/`: site em React + Vite (páginas públicas e formulários; o painel `/admin` vem na próxima etapa)
- `supabase/`: banco, regras de acesso e storage (`schema.sql`) e guia de publicação (`DEPLOY.md`)

## Rodar localmente
1. Siga os passos 1 e 2 do `supabase/DEPLOY.md` (criar o projeto e rodar o `schema.sql`).
2. Copie as pastas `logos`, `imagens` e `animais` para `frontend/public/` (veja `frontend/public/LEIA-ME.txt`).
3. ```bash
   cd frontend
   cp .env.example .env.local   # preencha URL e publishable key do Supabase
   npm install
   npm run dev
   ```

## Rotas
`/` · `/sobre` · `/adocao` · `/como-ajudar` · `/dicas-e-cuidados` · `/eventos` · `/fale-conosco`
Formulários: `/adotar` · `/apadrinhar` · `/voluntario` · `/trabalhe` · `/compartilhar` (cada um com `/enviado`)

## Onde editar
- Textos das páginas: `frontend/src/pages/`
- Campos dos formulários: `frontend/src/lib/forms.ts`
- Visual: `frontend/src/estilo.css`
