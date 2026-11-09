const URL_API = 'https://api.themoviedb.org/3';
const URL_IMAGEM = 'https://image.tmdb.org/t/p/w342';
const CHAVE_API = import.meta.env.VITE_TMDB_API_KEY;

const GENEROS_API = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Suspense',
  99: 'Outro',
  18: 'Drama',
  10751: 'Outro',
  14: 'Fantasia',
  36: 'Drama',
  27: 'Terror',
  10402: 'Outro',
  9648: 'Suspense',
  10749: 'Romance',
  878: 'Ficção científica',
  10770: 'Outro',
  53: 'Suspense',
  10752: 'Ação',
  37: 'Aventura',
};

function converterFilme(item) {
  let ano = 0;
  if (item.release_date) {
    ano = Number(item.release_date.slice(0, 4));
  }

  let genero = 'Outro';
  if (GENEROS_API[item.genre_ids[0]]) {
    genero = GENEROS_API[item.genre_ids[0]];
  }

  let cartaz = '';
  if (item.poster_path) {
    cartaz = URL_IMAGEM + item.poster_path;
  }

  return {
    idTmdb: item.id,
    titulo: item.title,
    ano: ano,
    genero: genero,
    cartaz: cartaz,
  };
}

async function carregarFilmes(url) {
  if (!CHAVE_API) {
    throw new Error(
      'Chave da API não encontrada. Crie o arquivo .env e reinicie o servidor.'
    );
  }

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(
      'Não foi possível buscar os filmes. Confira a chave da API e tente de novo.'
    );
  }

  const dados = await resposta.json();
  return dados.results.map(converterFilme);
}

export function buscarFilmes(texto) {
  return carregarFilmes(
    `${URL_API}/search/movie?api_key=${CHAVE_API}&language=pt-BR&query=${encodeURIComponent(texto)}`
  );
}

export function buscarRecomendacoes(id) {
  return carregarFilmes(
    `${URL_API}/movie/${id}/recommendations?api_key=${CHAVE_API}&language=pt-BR`
  );
}
