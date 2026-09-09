import axios from 'axios';
import { Usuario, UsuarioFiltro } from '../model/usuario';

const API_URL = 'http://localhost:8080/api/v1/users';//'https://jsonplaceholder.typicode.com/users';

export const UsuarioService = {
    getAllUsuarios: async (filtro: UsuarioFiltro) => {
        const response = await axios.get<Usuario[]>(API_URL, { params: filtro });
        return response.data;
    },
    getUsuarioById: async (id: number) => {
        const response = await axios.get<Usuario>(`${API_URL}/${id}`);
        return response.data;
    },
    createUsuario: async (usuario: Usuario) => {
        const response = await axios.post<Usuario[]>(API_URL, usuario);
        return response.data;
    },
    updateUsuario: async (id: number, usuario: Partial<Usuario>) => {
        const response = await axios.put<Usuario[]>(`${API_URL}/${id}`, usuario);
        return response.data;
    },
    deleteUsuario: async (id: number) => {
        const response = await axios.delete<Usuario[]>(`${API_URL}/${id}`);
        return response.data;
    }
}