import estilos from './FiltrosFilmes.module.css';

export default function FiltrosFilmes({
  busca,
  aoMudarBusca,
  genero,
  aoMudarGenero,
  generos,
}) {
  return (
    <div className={estilos.filtros}>
      <input
        aria-label="Pesquisar filme"
        value={busca}
        onChange={(evento) => aoMudarBusca(evento.target.value)}
        placeholder="Buscar pelo título..."
      />

      <select
        aria-label="Filtrar por gênero"
        value={genero}
        onChange={(evento) => aoMudarGenero(evento.target.value)}
      >
        {generos.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
