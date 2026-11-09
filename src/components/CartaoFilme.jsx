import estilos from './CartaoFilme.module.css';

export default function CartaoFilme({ filme, aoEditar, aoExcluir }) {
  return (
    <article className={estilos.cartao}>
      <div className={estilos.cartaz}>
        {filme.cartaz ? (
          <img src={filme.cartaz} alt={`Pôster de ${filme.titulo}`} />
        ) : (
          <>
            <span>▶</span>
            <small>{filme.ano || 'ANO N/I'}</small>
          </>
        )}
      </div>

      <div className={estilos.informacoes}>
        <div className={estilos.linhaTitulo}>
          <h3>{filme.titulo}</h3>
          <span className={estilos.nota}>★ {filme.nota}/5</span>
        </div>

        <p className={estilos.detalhes}>
          {filme.genero} · {filme.ano || 'Ano não informado'}
        </p>

        {filme.assistidoEm && (
          <p className={estilos.data}>
            Assistido em:{' '}
            {new Date(`${filme.assistidoEm}T00:00:00`).toLocaleDateString(
              'pt-BR'
            )}
          </p>
        )}

        {filme.comentario && (
          <p className={estilos.comentario}>“{filme.comentario}”</p>
        )}

        <div className={estilos.acoes}>
          <button onClick={() => aoEditar(filme)}>Editar</button>
          <button className={estilos.excluir} onClick={() => aoExcluir(filme.id)}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}
