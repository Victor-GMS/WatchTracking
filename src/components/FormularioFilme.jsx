import { useEffect, useState } from 'react';
import { GENEROS } from '../data/generos.js';
import estilos from './FormularioFilme.module.css';

export default function FormularioFilme({ filme, aoSalvar, aoCancelar }) {
  const [formulario, setFormulario] = useState(filme);

  useEffect(() => {
    setFormulario(filme);
  }, [filme]);

  function lidarComMudanca(evento) {
    const campo = evento.target.name;
    const valor = evento.target.value;
    setFormulario({ ...formulario, [campo]: valor });
  }

  function lidarComEnvio(evento) {
    evento.preventDefault();
    if (!formulario.titulo.trim()) return;

    aoSalvar({
      ...formulario,
      titulo: formulario.titulo.trim(),
      ano: Number(formulario.ano),
      nota: Number(formulario.nota),
    });
  }

  return (
    <form className={estilos.formulario} onSubmit={lidarComEnvio}>
      <div className={estilos.cabecalhoFormulario}>
        <h2>Editar filme</h2>
        <p>Ajuste as informações do filme assistido.</p>
      </div>

      <label>
        Título do filme
        <input
          name="titulo"
          value={formulario.titulo}
          onChange={lidarComMudanca}
          required
        />
      </label>

      <div className={estilos.duasColunas}>
        <label>
          Gênero
          <select
            name="genero"
            value={formulario.genero}
            onChange={lidarComMudanca}
          >
            {GENEROS.map((genero) => (
              <option key={genero}>{genero}</option>
            ))}
          </select>
        </label>

        <label>
          Ano de lançamento
          <input
            name="ano"
            type="number"
            min="1888"
            max="2100"
            value={formulario.ano || ''}
            onChange={lidarComMudanca}
            placeholder="2024"
          />
        </label>
      </div>

      <div className={estilos.duasColunas}>
        <label>
          Data em que assistiu
          <input
            name="assistidoEm"
            type="date"
            value={formulario.assistidoEm}
            onChange={lidarComMudanca}
          />
        </label>

        <label>
          Sua nota
          <select
            name="nota"
            value={formulario.nota}
            onChange={lidarComMudanca}
          >
            {[1, 2, 3, 4, 5].map((numero) => (
              <option key={numero} value={numero}>
                {'★'.repeat(numero)} ({numero}/5)
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Comentário
        <textarea
          name="comentario"
          rows="3"
          value={formulario.comentario}
          onChange={lidarComMudanca}
          placeholder="O que você achou do filme?"
        />
      </label>

      <div className={estilos.acoes}>
        <button type="submit">Salvar alterações</button>
        <button
          type="button"
          className={estilos.cancelar}
          onClick={aoCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
