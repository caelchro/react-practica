import axios from 'axios';
import { UsuarioService } from './UsuariosApi';
import { Usuario } from '../model/usuario';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

const usuario1: Usuario = {
    id: 1,
    name: 'Juan Pérez',
    username: 'juan',
    email: 'juan@correo.com',
    phone: '123456789',
    website: 'juan.com',
    address: {
        street: 'Calle 1',
        suite: '1A',
        city: 'Viña del Mar',
        zipcode: '12345',
        geo: {
            lat: '-33.02',
            lng: '-71.55'
        }
    },
    company: {
        name: 'Empresa 1',
        catchPhrase: 'Una empresa',
        bs: 'software'
    }
};

const usuario2: Usuario = {
    id: 2,
    name: 'Ana López',
    username: 'ana',
    email: 'ana@correo.com',
    phone: '987654321',
    website: 'ana.com',
    address: {
        street: 'Calle 2',
        suite: '2B',
        city: 'Santiago',
        zipcode: '54321',
        geo: {
            lat: '-33.45',
            lng: '-70.65'
        }
    },
    company: {
        name: 'Empresa 2',
        catchPhrase: 'Otra empresa',
        bs: 'technology'
    }
};

describe('UsuarioService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debería obtener todos los usuarios', async () => {
        mockedAxios.get.mockResolvedValue({
            data: [usuario1, usuario2]
        });

        const filtro = {
            name: 'Juan',
            email: 'juan@correo.com'
        };

        const resultado = await UsuarioService.getAllUsuarios(filtro);

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://localhost:8080/api/users',
            {
                params: filtro
            }
        );

        expect(resultado).toEqual([
            usuario1,
            usuario2
        ]);
    });

    test('debería obtener un usuario por id', async () => {
        mockedAxios.get.mockResolvedValue({
            data: usuario1
        });

        const resultado = await UsuarioService.getUsuarioById(1);

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'http://localhost:8080/api/users/1'
        );

        expect(resultado).toEqual(usuario1);
    });

    test('debería crear un usuario', async () => {
        mockedAxios.post.mockResolvedValue({
            data: [usuario1, usuario2]
        });

        const resultado = await UsuarioService.createUsuario(usuario1);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith(
            'http://localhost:8080/api/users',
            usuario1
        );

        expect(resultado).toEqual([
            usuario1,
            usuario2
        ]);
    });

    test('debería actualizar un usuario', async () => {
        mockedAxios.put.mockResolvedValue({
            data: [usuario1, usuario2]
        });

        const resultado = await UsuarioService.updateUsuario(
            usuario1.id,
            usuario1
        );

        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        expect(mockedAxios.put).toHaveBeenCalledWith(
            'http://localhost:8080/api/users/1',
            usuario1
        );

        expect(resultado).toEqual([
            usuario1,
            usuario2
        ]);
    });

    test('debería eliminar un usuario', async () => {
        mockedAxios.delete.mockResolvedValue({
            data: [usuario2]
        });

        const resultado = await UsuarioService.deleteUsuario(usuario1.id);

        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
        expect(mockedAxios.delete).toHaveBeenCalledWith(
            'http://localhost:8080/api/users/1'
        );

        expect(resultado).toEqual([
            usuario2
        ]);
    });

    test('debería propagar el error al obtener usuarios', async () => {
        const error = new Error('Error al obtener usuarios');

        mockedAxios.get.mockRejectedValue(error);

        await expect(
            UsuarioService.getAllUsuarios({})
        ).rejects.toThrow('Error al obtener usuarios');

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error al crear un usuario', async () => {
        const error = new Error('Error al crear usuario');

        mockedAxios.post.mockRejectedValue(error);

        await expect(
            UsuarioService.createUsuario(usuario1)
        ).rejects.toThrow('Error al crear usuario');

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error al actualizar un usuario', async () => {
        const error = new Error('Error al actualizar usuario');

        mockedAxios.put.mockRejectedValue(error);

        await expect(
            UsuarioService.updateUsuario(usuario1.id, usuario1)
        ).rejects.toThrow('Error al actualizar usuario');

        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    });

    test('debería propagar el error al eliminar un usuario', async () => {
        const error = new Error('Error al eliminar usuario');

        mockedAxios.delete.mockRejectedValue(error);

        await expect(
            UsuarioService.deleteUsuario(usuario1.id)
        ).rejects.toThrow('Error al eliminar usuario');

        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });

});