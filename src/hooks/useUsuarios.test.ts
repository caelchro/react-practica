import { renderHook, waitFor, act } from '@testing-library/react';
import { useUsuario } from './useUsuarios';
import { UsuarioService } from '../usuarios/UsuariosApi';
import { Usuario } from '../model/usuario';

jest.mock('../usuarios/UsuariosApi');

const mockedUsuarioService = jest.mocked(UsuarioService);

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

describe('useUsuario', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockedUsuarioService.getAllUsuarios.mockResolvedValue([]);
    });

    test('debería cargar los usuarios al iniciar', async () => {
        mockedUsuarioService.getAllUsuarios.mockResolvedValue([
            usuario1,
            usuario2
        ]);

        const { result } = renderHook(() => useUsuario());

        await waitFor(() => {
            expect(result.current.usuarios).toEqual([
                usuario1,
                usuario2
            ]);
        });

        expect(mockedUsuarioService.getAllUsuarios).toHaveBeenCalledTimes(1);
        expect(mockedUsuarioService.getAllUsuarios).toHaveBeenCalledWith({});
    });

    test('debería controlar loading mientras carga los usuarios', async () => {
        let resolver!: (usuarios: Usuario[]) => void;

        mockedUsuarioService.getAllUsuarios.mockImplementation(
            () => new Promise<Usuario[]>(resolve => {
                resolver = resolve;
            })
        );

        const { result } = renderHook(() => useUsuario());

        expect(result.current.loading).toBe(true);

        await act(async () => {
            resolver([usuario1]);
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.usuarios).toEqual([usuario1]);
    });

    test('debería establecer error cuando getAllUsuarios falla con 404', async () => {
        const error404 = {
            isAxiosError: true,
            response: {
                status: 404
            }
        };

        mockedUsuarioService.getAllUsuarios.mockRejectedValue(error404);

        const { result } = renderHook(() => useUsuario());

        await waitFor(() => {
            expect(result.current.error).toBe('No se encontraron usuarios.');
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería establecer error genérico cuando getAllUsuarios falla', async () => {
        mockedUsuarioService.getAllUsuarios.mockRejectedValue(
            new Error('Error inesperado')
        );

        const { result } = renderHook(() => useUsuario());

        await waitFor(() => {
            expect(result.current.error).toBe(
                'Se va a acabar el mundo porque Skynet nos dominará.'
            );
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería guardar los errores al actualizar un usuario', async () => {
        const error400 = {
            isAxiosError: true,
            response: {
                status: 400,
                data: {
                    email: 'Ingresa un email válido'
                }
            }
        };

        mockedUsuarioService.updateUsuario.mockRejectedValue(error400);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await expect(
                result.current.actualizarUsuario(usuario1)
            ).rejects.toEqual(error400);
        });

        await waitFor(() => {
            expect(result.current.errores).toEqual({
                email: 'Ingresa un email válido'
            });
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería establecer error cuando falla al actualizar un usuario', async () => {
        const error = new Error('Error inesperado');

        mockedUsuarioService.updateUsuario.mockRejectedValue(error);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await expect(
                result.current.actualizarUsuario(usuario1)
            ).rejects.toThrow('Error inesperado');
        });

        await waitFor(() => {
            expect(result.current.error).toBe(
                'No se pudo actualizar el usuario.'
            );
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería eliminar un usuario correctamente', async () => {
        mockedUsuarioService.deleteUsuario.mockResolvedValue([
            usuario2
        ]);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            result.current.eliminarUsuario(usuario1.id);
        });

        await waitFor(() => {
            expect(result.current.usuarios).toEqual([
                usuario2
            ]);
        });

        expect(mockedUsuarioService.deleteUsuario).toHaveBeenCalledTimes(1);
        expect(mockedUsuarioService.deleteUsuario).toHaveBeenCalledWith(
            usuario1.id
        );

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    test('debería guardar los errores cuando eliminar devuelve 404', async () => {
        const error404 = {
            isAxiosError: true,
            response: {
                status: 404,
                data: {
                    id: 'Usuario no encontrado'
                }
            }
        };

        mockedUsuarioService.deleteUsuario.mockRejectedValue(error404);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            result.current.eliminarUsuario(usuario1.id);
        });

        await waitFor(() => {
            expect(result.current.errores).toEqual({
                id: 'Usuario no encontrado'
            });
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería establecer error genérico cuando falla al eliminar un usuario', async () => {
        const error = new Error('Error inesperado');

        mockedUsuarioService.deleteUsuario.mockRejectedValue(error);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            result.current.eliminarUsuario(usuario1.id);
        });

        await waitFor(() => {
            expect(result.current.error).toBe(
                'Se va a acabar el mundo porque Skynet nos dominará eliminando usuarios.'
            );
        });

        expect(result.current.loading).toBe(false);
    });


    /*********************************
     * FALLAS
     * 
     ********************************/


    test('debería agregar un usuario correctamente', async () => {
        mockedUsuarioService.createUsuario.mockResolvedValue([
            usuario1,
            usuario2
        ]);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await result.current.agregarUsuario(usuario1);
        });

        expect(mockedUsuarioService.createUsuario).toHaveBeenCalledTimes(1);
        expect(mockedUsuarioService.createUsuario).toHaveBeenCalledWith(
            usuario1
        );

        expect(result.current.usuarios).toEqual([
            usuario1,
            usuario2
        ]);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.errores).toEqual({});
    });


    //porque!!
    test('debería guardar los errores de validación al agregar un usuario', async () => {
        const error400 = {
            isAxiosError: true,
            response: {
                status: 400,
                data: {
                    username: 'Este campo es obligatorio',
                    email: 'Ingresa un email válido'
                }
            }
        };

        mockedUsuarioService.createUsuario.mockRejectedValue(error400);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await expect(
                result.current.agregarUsuario(usuario1)
            ).rejects.toEqual(error400);
        });

        await waitFor(() => {
            expect(result.current.errores).toEqual({
                username: 'Este campo es obligatorio',
                email: 'Ingresa un email válido'
            });
        });

        expect(result.current.loading).toBe(false);
    });

    test('debería establecer error genérico cuando falla al agregar un usuario', async () => {
        const error = new Error('Error inesperado');

        mockedUsuarioService.createUsuario.mockRejectedValue(error);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await expect(
                result.current.agregarUsuario(usuario1)
            ).rejects.toThrow('Error inesperado');
        });

        await waitFor(() => {
            expect(result.current.error).toBe(
                'Se va a acabar el mundo porque Skynet nos dominará agregando usuarios.'
            );
        });

        expect(result.current.loading).toBe(false);
    });


    test('debería actualizar un usuario correctamente', async () => {
        mockedUsuarioService.updateUsuario.mockResolvedValue([
            usuario1,
            usuario2
        ]);

        const { result } = renderHook(() => useUsuario());

        await act(async () => {
            await result.current.actualizarUsuario(usuario1);
        });

        expect(mockedUsuarioService.updateUsuario).toHaveBeenCalledTimes(1);
        expect(mockedUsuarioService.updateUsuario).toHaveBeenCalledWith(
            usuario1.id,
            usuario1
        );

        expect(result.current.usuarios).toEqual([
            usuario1,
            usuario2
        ]);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.errores).toEqual({});
    });

});