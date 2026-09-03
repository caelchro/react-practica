import { useState } from 'react';
import TablaUsuarios from './tabla';
import Buscador from './buscador';
import { useUsuario } from '../hooks/useUsuarios';
import { UsuarioFiltro } from '../model/usuario';
import { ModalEditar } from './editar';

function Usuarios() {
    const { loading, error, errores, usuarios, agregarUsuario, actualizarUsuario, eliminarUsuario, getAllUsuarios } = useUsuario();
    const [filtroName, setFiltroName] = useState<string>('');
    const [filtroEmail, setFiltroEmail] = useState<string>('');

    const limpiarFiltros = () => {
        setFiltroName('');
        setFiltroEmail('');
    };

    const recargarUsuarios = () => {
        limpiarFiltros();
        let filtro: UsuarioFiltro = {
            email: filtroEmail,
            name: filtroName
        };
        getAllUsuarios(filtro);
    }

    let filtrados = usuarios;
    if (filtroName && filtroName !== '') {
        filtrados = filtrados.filter(u => u.name.toLowerCase().includes(filtroName.toLowerCase()));
    }
    if (filtroEmail && filtroEmail !== '') {
        filtrados = filtrados.filter(u => u.email.toLowerCase().includes(filtroEmail.toLowerCase()));
    }
    return (
        <div>
            <h1>Gestión de Usuarios</h1> <button type="button" onClick={recargarUsuarios}>Recargar</button>
            {loading && <p>Cargando usuarios...</p>}
            {error && <p>{error}</p>}
            <ModalEditar errores={errores} onSave={agregarUsuario} />
            <Buscador setFiltroName={setFiltroName} setFiltroEmail={setFiltroEmail} limpiar={limpiarFiltros} />
            <TablaUsuarios
                usuarios={filtrados}
                onDelete={eliminarUsuario}
                onEdit={actualizarUsuario} />
        </div>
    );
}
export default Usuarios;