
import { useState } from 'react';
import { Persona } from '../model/perosna';
function FormPersonas({ onAdd }: { onAdd: (persona: Persona) => void }) {

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const agregarPersona = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (name && name.trim() !== '') {
      console.log("FormPersonas: agregarPersona...", { name: name.trim(), username: username.trim(), email: email.trim() });
      let persona = { id: 0, name: name.trim(), username: username.trim(), email: email.trim() };
      onAdd(persona);
      setName('');
      setUserName('');
      setEmail('');
    }
  };

  return (
    <div>
      <form onSubmit={agregarPersona}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default FormPersonas;
