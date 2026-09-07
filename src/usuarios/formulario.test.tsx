
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from './formulario';

describe('Formulario', () => {

    test('debería renderizar el formulario', () => {

        render(
            <Formulario
                onAdd={jest.fn()}
                errores={{}}
            />
        );

        expect(screen.getByText('Formulario de Usuario')).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Nombre')
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText('Correo electrónico')
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: 'Agregar Usuario' })
        ).toBeInTheDocument();
    });

    test('debería enviar el usuario con los datos ingresados', async () => {
        const onAdd = jest.fn().mockResolvedValue(undefined);

        const user = userEvent.setup();

        render(
            <Formulario
                onAdd={onAdd}
                errores={{}}
            />
        );

        const nombre = screen.getByPlaceholderText('Nombre');
        const email = screen.getByPlaceholderText('Correo electrónico');

        await user.type(nombre, 'Juan Pérez');
        await user.type(email, 'juan@correo.com');

        await user.click(
            screen.getByRole('button', { name: 'Agregar Usuario' })
        );

        expect(onAdd).toHaveBeenCalledTimes(1);

        expect(onAdd).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Juan Pérez',
                email: 'juan@correo.com',
            })
        );
    });

    test('no debería ejecutar onSaved si onAdd falla', async () => {
        const onAdd = jest.fn().mockRejectedValue(new Error('Error al guardar'));
        const onSaved = jest.fn();

        const user = userEvent.setup();

        render(
            <Formulario
                onAdd={onAdd}
                errores={{}}
                onSaved={onSaved}
            />
        );

        const nombre = screen.getByPlaceholderText('Nombre');

        await user.type(nombre, 'Juan Pérez');

        await user.click(
            screen.getByRole('button', { name: 'Agregar Usuario' })
        );

        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onSaved).not.toHaveBeenCalled();
    });

    test('debería mostrar los errores recibidos del backend', () => {
        render(
            <Formulario
                onAdd={jest.fn()}
                errores={{
                    username: 'Este campo es obligatorio',
                    email: 'Ingresa un email válido',
                }}
            />
        );

        expect(
            screen.getByText('Este campo es obligatorio')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Ingresa un email válido')
        ).toBeInTheDocument();
    });

    test('debería limpiar el formulario después de crear un usuario', async () => {
        const onAdd = jest.fn().mockResolvedValue(undefined);

        const user = userEvent.setup();

        render(
            <Formulario
                onAdd={onAdd}
                errores={{}}
            />
        );

        const nombre = screen.getByPlaceholderText('Nombre');
        const email = screen.getByPlaceholderText('Correo electrónico');

        await user.type(nombre, 'Juan Pérez');
        await user.type(email, 'juan@correo.com');

        expect(nombre).toHaveValue('Juan Pérez');
        expect(email).toHaveValue('juan@correo.com');

        await user.click(
            screen.getByRole('button', { name: 'Agregar Usuario' })
        );

        expect(nombre).toHaveValue('');
        expect(email).toHaveValue('');
    });
});