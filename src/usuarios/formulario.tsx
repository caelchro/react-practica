import { useState } from "react";
import { Usuario } from "../model/usuario";

const usuarioVacio: Usuario = {
    id: 0, name: '', username: '', email: '', phone: '',
    website: '', address: {
        street: '', suite: '', city: '', zipcode: '',
        geo: { lat: '', lng: '' }
    }, company: { name: '', catchPhrase: '', bs: '' }
};

function Formulario({
    onAdd,
    errores,
    usuarioInicial = usuarioVacio,
    textoBoton = 'Agregar Usuario',
    onSaved,
}: {
    onAdd: (usuario: Usuario) => Promise<void>;
    errores: Record<string, string>;
    usuarioInicial?: Usuario;
    textoBoton?: string;
    onSaved?: () => void;
}) {
    const [usuarioNew, setUsuarioNew] = useState<Usuario>(usuarioInicial);

    const reiniciarFormulario = () => setUsuarioNew({
        id: 0, name: '', username: '', email: '', phone: '',
        website: '', address: {
            street: '', suite: '', city: '', zipcode: '',
            geo: { lat: '', lng: '' }
        }, company: { name: '', catchPhrase: '', bs: '' }
    });

    const cambiarCampo = (campo: keyof Usuario, valor: string) => {
        setUsuarioNew(usuario => ({
            ...usuario,
            [campo]: valor
        }));
    };

    return (
        <div>
            <h2>Formulario de Usuario</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                void (async () => {
                    try {
                        await onAdd(usuarioNew);
                        onSaved?.();
                        if (usuarioInicial.id === 0) reiniciarFormulario();
                    } catch { }
                })();
            }}>
                <input type="text" placeholder="Nombre" value={usuarioNew.name} onChange={(e) => setUsuarioNew({ ...usuarioNew, name: e.target.value })} required />
                <div className="field">
                    <input type="text" placeholder="Nombre de usuario" value={usuarioNew.username} onChange={(e) => cambiarCampo('username', e.target.value)} />
                    {errores.username && <span className="error">{errores.username}</span>}
                </div>
                <div className="field">
                    <input type="email" placeholder="Correo electrónico" value={usuarioNew.email} onChange={(e) => cambiarCampo('email', e.target.value)} />
                    {errores.email && <span className="error">{errores.email}</span>}
                </div>
                <input type="text" placeholder="Teléfono" value={usuarioNew.phone} onChange={(e) => cambiarCampo('phone', e.target.value)} />
                <input type="text" placeholder="Sitio web" value={usuarioNew.website} onChange={(e) => cambiarCampo('website', e.target.value)} />
                <input type="text" placeholder="Calle" value={usuarioNew.address ? usuarioNew.address.street : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, street: e.target.value } })} />
                <input type="text" placeholder="Suite" value={usuarioNew.address ? usuarioNew.address.suite : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, suite: e.target.value } })} />
                <input type="text" placeholder="Ciudad" value={usuarioNew.address ? usuarioNew.address.city : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, city: e.target.value } })} />
                <input type="text" placeholder="Código postal" value={usuarioNew.address ? usuarioNew.address.zipcode : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, zipcode: e.target.value } })} />
                <input type="text" placeholder="Latitud" value={usuarioNew.address ? usuarioNew.address.geo.lat : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, geo: { ...usuarioNew.address.geo, lat: e.target.value } } })} />
                <input type="text" placeholder="Longitud" value={usuarioNew.address ? usuarioNew.address.geo.lng : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, address: { ...usuarioNew.address, geo: { ...usuarioNew.address.geo, lng: e.target.value } } })} />
                <input type="text" placeholder="Nombre de la compañía" value={usuarioNew.company ? usuarioNew.company.name : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, company: { ...usuarioNew.company, name: e.target.value } })} />
                <input type="text" placeholder="Eslogan" value={usuarioNew.company ? usuarioNew.company.catchPhrase : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, company: { ...usuarioNew.company, catchPhrase: e.target.value } })} />
                <input type="text" placeholder="BS" value={usuarioNew.company ? usuarioNew.company.bs : ''} onChange={(e) => setUsuarioNew({ ...usuarioNew, company: { ...usuarioNew.company, bs: e.target.value } })} />
                <button type="submit">{textoBoton}</button>
            </form>
        </div>
    );
}
export default Formulario;
