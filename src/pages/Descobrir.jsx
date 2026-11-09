import { useEffect, useState } from 'react';
import CartaoDescobrir from '../components/CartaoDescobrir.jsx';
import { buscarFilmes, buscarRecomendacoes } from '../services/tmdb.js';
import estilos from './Descobrir.module.css';

export default function Descobrir({ filmes, aoAdicionar }) {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [buscou, setBuscou] = useState(false);

  const [recomendacoes, setRecomendacoes] = useState([]);
  const [carregandoRecomendacoes, setCarregandoRecomendacoes] = useState(false);
  const [erroRecomendacoes, setErroRecomendacoes] = useState('');

  const ultimoDaApi = filmes.find((filme) => filme.idTmdb);
  const idBase = ultimoDaApi ? ultimoDaApi.idTmdb : null;

  useEffect(() => {
    async function carregarRecomendacoes() {
      setCarregandoRecomendacoes(true);
      setErroRecomendacoes('');
      try {
        const dados = await buscarRecomendacoes(idBase);
        setRecomendacoes(dados);
      } catch (problema) {
        setErroRecomendacoes(problema.message);
      }
      setCarregandoRecomendacoes(false);
    }

    if (idBase) {
      carregarRecomendacoes();
    } else {
      setRecomendacoes([]);
    }
  }, [idBase]);

  async function lidarComBusca(evento) {
    evento.preventDefault();
    if (!busca.trim()) return;

    setCarregando(true);
    setErro('');
    try {
      const dados = await buscarFilmes(busca);
      setResultados(dados);
      setBuscou(true);
    } catch (problema) {
      setErro(problema.message);
    }
    setCarregando(false);
  }

  function jaAssistiu(filme) {
    return filmes.some((item) => item.idTmdb === filme.idTmdb);
  }

  function marcarComoAssistido(filme, nota) {
    aoAdicionar({
      titulo: filme.titulo,
      ano: filme.ano,
      genero: filme.genero,
      cartaz: filme.cartaz,
      idTmdb: filme.idTmdb,
      assistidoEm: new Date().toLocaleDateString('en-CA'),
      nota: nota,
      comentario: '',
    });
  }

  const recomendacoesParaMostrar = recomendacoes
    .filter((filme) => !jaAssistiu(filme))
    .slice(0, 12);

  return (
    <section className={estilos.pagina}>
      <div className={estilos.cabecalhoPagina}>
        <span className={estilos.sobretitulo}>BUSQUE E DESCUBRA</span>
        <h1>Descobrir filmes</h1>
        <p>Procure um filme, marque como assistido e receba recomendações.</p>
      </div>

      <div className={estilos.bloco}>
        <form className={estilos.formularioBusca} onSubmit={lidarComBusca}>
          <input
            className={estilos.busca}
            aria-label="Buscar filme"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Digite o nome de um filme..."
          />
          <button className={estilos.botaoBusca} type="submit">
            Buscar
          </button>
        </form>

        {carregando && <p className={estilos.aviso}>Buscando filmes...</p>}
        {erro && <p className={estilos.erro}>{erro}</p>}
        {buscou && !carregando && !erro && resultados.length === 0 && (
          <p className={estilos.aviso}>Nenhum filme encontrado.</p>
        )}

        {resultados.length > 0 && (
          <div className={estilos.grade}>
            {resultados.map((filme) => (
              <CartaoDescobrir
                key={filme.idTmdb}
                filme={filme}
                assistido={jaAssistiu(filme)}
                aoAssistir={marcarComoAssistido}
              />
            ))}
          </div>
        )}
      </div>

      <div className={estilos.bloco}>
        <h2>Recomendados para você</h2>

        {!ultimoDaApi && (
          <p className={estilos.aviso}>
            Marque um filme como assistido na busca para receber recomendações.
          </p>
        )}
        {ultimoDaApi && (
          <p className={estilos.aviso}>
            Porque você assistiu {ultimoDaApi.titulo}:
          </p>
        )}
        {carregandoRecomendacoes && (
          <p className={estilos.aviso}>Carregando recomendações...</p>
        )}
        {erroRecomendacoes && (
          <p className={estilos.erro}>{erroRecomendacoes}</p>
        )}

        {recomendacoesParaMostrar.length > 0 && (
          <div className={estilos.grade}>
            {recomendacoesParaMostrar.map((filme) => (
              <CartaoDescobrir
                key={filme.idTmdb}
                filme={filme}
                assistido={false}
                aoAssistir={marcarComoAssistido}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
