import axios from 'axios';
import { Persona } from '../model/perosna';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const PersonaService = {
  
  getPersonas: async (): Promise<Persona[]> => {
    console.log("PersonaService: getPersonas...");
    const response = await axios.get<Persona[]>(API_URL);
    return response.data;
    //  return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(personasMock);
    //         }, 1000);
    //     });
  },

  obtenerPorId: async (id: number): Promise<Persona> => {
    const response = await axios.get<Persona>(`${API_URL}/${id}`);
    return response.data;
  },
};
