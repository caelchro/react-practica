import { Persona } from "../model/perosna";

function ListaPersonas({ personas, onDelete }: { personas: Persona[]; onDelete: (id: number) => void } ) {
  return (
    <div>
      <ul>
        {personas.map(persona => (
          <li key={persona.id}>
            {persona.id} --- {persona.name}
            <button onClick={() => onDelete(persona.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPersonas;