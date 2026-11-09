import { NavLink, Outlet } from 'react-router-dom';
import estilos from './Estrutura.module.css';

export default function Estrutura() {
  return (
    <div className={estilos.estrutura}>
      <header className={estilos.cabecalho}>
        <NavLink to="/" className={estilos.marca}>
          <span className={estilos.logo}>▶</span> WatchTracking
        </NavLink>

        <nav className={estilos.navegacao} aria-label="Navegação principal">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/filmes">Meus filmes</NavLink>
          <NavLink to="/descobrir">Descobrir</NavLink>
        </nav>
      </header>

      <main className={estilos.principal}>
        <Outlet />
      </main>

      <footer className={estilos.rodape}>
        WatchTracking · Sua história no cinema, em um só lugar.
      </footer>
    </div>
  );
}
