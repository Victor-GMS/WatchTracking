import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Estrutura from './components/Estrutura.jsx';
import Descobrir from './pages/Descobrir.jsx';
import Inicio from './pages/Inicio.jsx';
import MeusFilmes from './pages/MeusFilmes.jsx';
import NaoEncontrado from './pages/NaoEncontrado.jsx';

export default function App() {
  const [filmes, setFilmes] = useState(() => {
    const salvos = localStorage.getItem('watchtracking-filmes');
    if (salvos) {
      return JSON.parse(salvos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('watchtracking-filmes', JSON.stringify(filmes));
  }, [filmes]);

  function adicionarFilme(filme) {
    setFilmes([{ ...filme, id: Date.now() }, ...filmes]);
  }

  function editarFilme(id, novosDados) {
    setFilmes(
      filmes.map((filme) => (filme.id === id ? { ...novosDados, id: id } : filme))
    );
  }

  function excluirFilme(id) {
    setFilmes(filmes.filter((filme) => filme.id !== id));
  }

  return (
    <Routes>
      <Route element={<Estrutura />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/filmes"
          element={
            <MeusFilmes
              filmes={filmes}
              aoEditar={editarFilme}
              aoExcluir={excluirFilme}
            />
          }
        />
        <Route
          path="/descobrir"
          element={<Descobrir filmes={filmes} aoAdicionar={adicionarFilme} />}
        />
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  );
}
