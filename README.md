# WatchTracking — Navegador de Filmes Assistidos

Projeto final de React: aplicação para registrar e organizar os filmes que o usuário já assistiu.

## Como executar

1. Instale o [Node.js](https://nodejs.org/) (versão LTS).
2. Abra esta pasta no VS Code.
3. No terminal, execute `npm install`.
4. Crie o arquivo `.env` (veja a seção **API de filmes**) e execute `npm run dev`.
5. Abra o endereço local mostrado no terminal.

## API de filmes (TMDB)

A página **Descobrir** usa a API pública do [TMDB](https://www.themoviedb.org/) para buscar filmes e recomendar outros.

1. Crie uma conta gratuita em themoviedb.org e, em *Configurações → API*, gere a chave (API Key v3).
2. Copie o arquivo `.env.example` para `.env` e cole a chave: `VITE_TMDB_API_KEY=sua_chave_aqui`
3. Reinicie o `npm run dev` (o Vite só lê o `.env` ao iniciar).

O arquivo `.env` está no `.gitignore` e **não deve ir para o GitHub**: cada pessoa da dupla cria o seu.

## Funcionalidades

- Busca de filmes na API, com mensagens de carregando e de erro.
- Marcar o filme como assistido, escolhendo a nota. Ele entra na coleção com a data de hoje.
- Recomendações da API com base no último filme adicionado.
- Listagem em cards, edição e exclusão de filmes (CRUD).
- Busca pelo título e filtro por gênero na lista.
- Dados salvos no `localStorage`: os filmes permanecem após atualizar o navegador.
- Rotas: Início (`/`), Meus filmes (`/filmes`), Descobrir (`/descobrir`) e página 404.
- CSS Modules em cada componente e página.

## Estrutura principal

- `src/App.jsx`: rotas, estado `filmes`, `localStorage` e as funções de criar, editar e excluir.
- `src/components/Estrutura.jsx`: cabeçalho, menu e área onde a página aparece (`Outlet`).
- `src/components/CartaoFilme.jsx`: card de um filme da coleção.
- `src/components/FormularioFilme.jsx`: formulário controlado para editar um filme.
- `src/components/FiltrosFilmes.jsx`: campo de busca e seletor de gênero.
- `src/components/CartaoDescobrir.jsx`: card de um filme vindo da API.
- `src/pages/Inicio.jsx`, `MeusFilmes.jsx`, `Descobrir.jsx` e `NaoEncontrado.jsx`: as páginas.
- `src/services/tmdb.js`: funções que chamam a API com `fetch`.
- `src/data/generos.js`: lista de gêneros usada no formulário e no filtro.
- Arquivos `.module.css`: estilos de cada componente e página.

## Conceitos para estudar e explicar

- **Props:** dados e funções enviados do pai para o filho. Ex.: `filme`, `aoEditar` e `aoExcluir` no `CartaoFilme`.
- **useState:** guarda dados que mudam e atualiza a tela quando mudam.
- **Formulário controlado:** cada campo recebe o valor do estado (`value`) e atualiza o estado com `onChange`.
- **map e key:** `map` transforma cada filme em um card; `key={filme.id}` identifica cada item.
- **filter:** cria uma nova lista só com os filmes que combinam com a busca e o gênero.
- **Estado no App:** `filmes` fica no `App` e é enviado por props para as duas páginas.
- **CRUD:** criar (`adicionarFilme`), listar (`map`), editar (`editarFilme`) e excluir (`excluirFilme`).
- **localStorage:** `setItem` salva e `getItem` lê. `JSON.stringify` e `JSON.parse` convertem entre objeto e texto.
- **useEffect:** salva no `localStorage` quando `filmes` muda e busca as recomendações quando o filme-base muda.
- **fetch com async/await:** pede os dados à API; `carregando` e `erro` mostram o carregando e o erro.
- **React Router:** liga cada endereço a uma página. A rota `*` mostra a página 404.
- **CSS Modules:** cada `.module.css` gera classes só daquele componente.

## Observação

Os dados ficam salvos somente no navegador e no dispositivo em que foram cadastrados.
