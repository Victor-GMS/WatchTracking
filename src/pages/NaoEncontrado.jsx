import { Link } from 'react-router-dom';
import estilos from './NaoEncontrado.module.css';

export default function NaoEncontrado() {
  return (
    <section className={estilos.pagina}>
      <strong>404</strong>
      <h1>Essa cena não existe.</h1>
      <p>O endereço que você tentou acessar não faz parte do nosso catálogo.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  );
}
