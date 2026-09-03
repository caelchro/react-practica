import { useCallback, useEffect, useState } from "react";
import { Usuario, UsuarioFiltro } from "../model/usuario";
import { UsuarioService } from "../usuarios/UsuariosApi";
import axios from "axios";

export const useUsuario = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [errores, setErrores] = useState<Record<string, string>>({});

    const getAllUsuarios = useCallback((filtro: UsuarioFiltro) => {
        setLoading(true);
        setError(null);
        UsuarioService.getAllUsuarios(filtro)
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error("Error al cargar:", JSON.stringify(error));
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setError("No se encontraron usuarios.");
                } else {
                    setError("Se va a acabar el mundo porque Skynet nos dominará.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        getAllUsuarios({});
    }, [getAllUsuarios]);

    const agregarUsuario = async (usuario: Usuario) => {
        setLoading(true);
        setError(null);
        setErrores({});
        try {
            const data = await UsuarioService.createUsuario(usuario);
            setUsuarios(data);
        } catch (error) {
            console.error("Error al agregar usuario:", JSON.stringify(error));
            if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 404)) {
                setErrores(error.response?.data ?? {});
            } else {
                setError("Se va a acabar el mundo porque Skynet nos dominará agregando usuarios.");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const eliminarUsuario = (id: number) => {
        setLoading(true);
        setError(null);
        UsuarioService.deleteUsuario(id)
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error("Error al eliminar:", JSON.stringify(error));
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    // setError("No se pudo eliminar el usuario.");
                    setErrores(error.response?.data ?? {});
                } else {
                    setError("Se va a acabar el mundo porque Skynet nos dominará eliminando usuarios.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const actualizarUsuario = async (usuario: Usuario) => {
        setLoading(true);
        setError(null);
        setErrores({});
        try {
            const data = await UsuarioService.updateUsuario(usuario.id, usuario);
            setUsuarios(data);
        } catch (error) {
            console.error("Error al actualizar usuario:", JSON.stringify(error));
            if (axios.isAxiosError(error)) {
                setErrores(error.response?.data ?? {});
            } else {
                setError("No se pudo actualizar el usuario.");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, errores, usuarios, agregarUsuario, actualizarUsuario, eliminarUsuario, getAllUsuarios };
};