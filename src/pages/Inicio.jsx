import { Link } from 'react-router-dom';
import estilos from './Inicio.module.css';

export default function Inicio() {
  return (
    <section className={estilos.apresentacao}>
      <div className={estilos.etiqueta}>🎬 SEU DIÁRIO DE CINEMA</div>

      <h1>
        Todo filme deixa
        <br />
        <span>uma história.</span>
      </h1>

      <p>
        Guarde os filmes que você já assistiu, registre suas avaliações e
        mantenha sua coleção organizada em um só lugar.
      </p>

      <Link className={estilos.chamada} to="/filmes">
        Explorar minha coleção <span>→</span>
      </Link>

      <div className={estilos.destaques}>
        <article>
          <strong>01</strong>
          <h3>Registre</h3>
          <p>Adicione título, gênero, ano e quando assistiu.</p>
        </article>

        <article>
          <strong>02</strong>
          <h3>Avalie</h3>
          <p>Dê uma nota e escreva o que achou do filme.</p>
        </article>

        <article>
          <strong>03</strong>
          <h3>Relembre</h3>
          <p>Encontre seus filmes sempre que quiser.</p>
        </article>
      </div>
    </section>
  );
}
