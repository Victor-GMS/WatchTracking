import { useState } from 'react';
import estilos from './CartaoDescobrir.module.css';

export default function CartaoDescobrir({ filme, assistido, aoAssistir }) {
  const [nota, setNota] = useState(5);

  return (
    <article className={estilos.cartao}>
      <div className={estilos.cartaz}>
        {filme.cartaz ? (
          <img src={filme.cartaz} alt={`Pôster de ${filme.titulo}`} />
        ) : (
          <span>▶</span>
        )}
      </div>

      <div className={estilos.informacoes}>
        <h3>{filme.titulo}</h3>
        <p>
          {filme.genero} · {filme.ano || 'Ano não informado'}
        </p>

        {assistido ? (
          <span className={estilos.pronto}>✓ Na sua lista</span>
        ) : (
          <div className={estilos.acoes}>
            <select
              aria-label={`Sua nota para ${filme.titulo}`}
              value={nota}
              onChange={(evento) => setNota(evento.target.value)}
            >
              {[1, 2, 3, 4, 5].map((numero) => (
                <option key={numero} value={numero}>
                  ★ {numero}/5
                </option>
              ))}
            </select>
            <button onClick={() => aoAssistir(filme, Number(nota))}>
              Já assisti
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
