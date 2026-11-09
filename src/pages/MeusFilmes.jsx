import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartaoFilme from '../components/CartaoFilme.jsx';
import FiltrosFilmes from '../components/FiltrosFilmes.jsx';
import FormularioFilme from '../components/FormularioFilme.jsx';
import { GENEROS } from '../data/generos.js';
import estilos from './MeusFilmes.module.css';

export default function MeusFilmes({ filmes, aoEditar, aoExcluir }) {
  const [busca, setBusca] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('Todos');
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  const generos = ['Todos', ...GENEROS];

  const filmesFiltrados = filmes.filter((filme) => {
    const combinaBusca = filme.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());
    const combinaGenero =
      filtroGenero === 'Todos' || filme.genero === filtroGenero;
    return combinaBusca && combinaGenero;
  });

  function comecarEdicao(filme) {
    setFilmeEmEdicao(filme);
    window.scrollTo(0, 0);
  }

  function salvarFilme(dadosFilme) {
    aoEditar(filmeEmEdicao.id, dadosFilme);
    setFilmeEmEdicao(null);
  }

  function lidarComExclusao(id) {
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      aoExcluir(id);
      if (filmeEmEdicao && filmeEmEdicao.id === id) {
        setFilmeEmEdicao(null);
      }
    }
  }

  return (
    <section className={estilos.pagina}>
      <div className={estilos.cabecalhoPagina}>
        <div>
          <span className={estilos.sobretitulo}>SUA COLEÇÃO PARTICULAR</span>
          <h1>Meus filmes</h1>
          <p>Uma coleção de histórias que você já viveu.</p>
        </div>

        <div className={estilos.contador}>
          <strong>{filmes.length}</strong>
          <span>filmes salvos</span>
        </div>
      </div>

      <div
        className={`${estilos.colunas} ${filmeEmEdicao ? estilos.comFormulario : ''}`}
      >
        {filmeEmEdicao && (
          <aside>
            <FormularioFilme
              filme={filmeEmEdicao}
              aoSalvar={salvarFilme}
              aoCancelar={() => setFilmeEmEdicao(null)}
            />
          </aside>
        )}

        <div className={estilos.biblioteca}>
          <FiltrosFilmes
            busca={busca}
            aoMudarBusca={setBusca}
            genero={filtroGenero}
            aoMudarGenero={setFiltroGenero}
            generos={generos}
          />

          {filmesFiltrados.length > 0 ? (
            <div className={estilos.lista}>
              {filmesFiltrados.map((filme) => (
                <CartaoFilme
                  key={filme.id}
                  filme={filme}
                  aoEditar={comecarEdicao}
                  aoExcluir={lidarComExclusao}
                />
              ))}
            </div>
          ) : (
            <div className={estilos.vazio}>
              <span>🎞️</span>
              <h2>
                {filmes.length
                  ? 'Nenhum filme encontrado'
                  : 'Sua coleção está vazia'}
              </h2>
              <p>
                {filmes.length
                  ? 'Tente mudar a busca ou o gênero selecionado.'
                  : 'Busque um filme na página Descobrir e marque como assistido.'}
              </p>
              {filmes.length === 0 && (
                <Link className={estilos.linkVazio} to="/descobrir">
                  Descobrir filmes
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
