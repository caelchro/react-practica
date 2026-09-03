import { useState } from 'react';
import FormPersonas from './formPersonas';
import ListaPersonas from './listaPersonas';
import FiltroPersonas from './buscadorPersona';
import { usePersona } from '../hooks/usePersona';

function App() {

  const [filtro, setFiltro] = useState('');

  const {
    personas,
    loading,
    error,
    cargarPersonas,
    agregarPersona,
    eliminarPersona
  } = usePersona();

  console.log("Personas en App:", personas);

  const personasFiltradas = (filtro && filtro !== '' ?
    personas.filter(u => u.name.toLowerCase().includes(filtro.toLowerCase())) : personas);

  if (loading) return <p>Cargando personas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Personas</h1> <button type="button" onClick={cargarPersonas}>Recargar</button>
      <FormPersonas onAdd={agregarPersona} />
      <FiltroPersonas filtro={filtro} onFilter={setFiltro} />
      Cantidad de personas: {personasFiltradas.length}
      <ListaPersonas personas={personasFiltradas} onDelete={eliminarPersona} />
    </div>
  );
}

export default App;
