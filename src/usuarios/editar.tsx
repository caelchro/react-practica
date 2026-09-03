import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Usuario } from '../model/usuario';
import Formulario from './formulario';

export function ModalEditar({
    usuario,
    errores,
    onSave,
}: {
    usuario?: Usuario;
    errores: Record<string, string>;
    onSave: (usuario: Usuario) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const esEdicion = usuario !== undefined;

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button type="button">{esEdicion ? 'Editar' : 'Nuevo usuario'}</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                    <Dialog.Title>{esEdicion ? 'Editar usuario' : 'Crear usuario'}</Dialog.Title>
                    <Dialog.Description>
                        Completa los datos del usuario y guarda los cambios.
                    </Dialog.Description>
                    <Formulario
                        usuarioInicial={usuario}
                        onAdd={onSave}
                        errores={errores}
                        textoBoton={esEdicion ? 'Guardar cambios' : 'Crear usuario'}
                        onSaved={() => setOpen(false)}
                    />
                    <Dialog.Close asChild>
                        <button type="button">Cancelar</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
