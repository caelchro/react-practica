import { createColumnHelper, flexRender, tableFeatures, useTable } from "@tanstack/react-table";
import { Usuario } from "../model/usuario";
import { ModalEditar } from './editar';

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Usuario>();

const columns = columnHelper.columns([
	columnHelper.accessor("id", {
		header: "ID",
	}),
	columnHelper.accessor("name", {
		header: "Nombre",
	}),
	columnHelper.accessor("username", {
		header: "Usuario",
	}),
	columnHelper.accessor("email", {
		header: "Correo",
		cell: ({ getValue }) => <a href={`mailto:${getValue()}`}>{getValue()}</a>,
	}),
	columnHelper.accessor("phone", {
		header: "Teléfono",
	}),
	columnHelper.accessor((usuario) => usuario.company.name, {
		id: "company",
		header: "Compañía",
        cell: ({ row }) => {
            return (row.original.company ? row.original.company.name : "")   ;
        }
	}),
]);

function TablaUsuarios({ usuarios, onDelete, onEdit }: { usuarios: Usuario[]; onDelete: (id: number) => void; onEdit: (usuario: Usuario) => Promise<void> }) {
	const table = useTable({
		data: usuarios,
		columns,
		features,
	});

	return (
		<div>
			<table>
				<caption>Usuarios registrados</caption>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} scope="col">
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
							<th scope="col">Acciones</th>
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.length === 0 ? (
						<tr>
							<td colSpan={columns.length + 1}>No hay usuarios para mostrar.</td>
						</tr>
					) : (
						table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getAllCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
								<td>
									<ModalEditar usuario={row.original} errores={{}} onSave={onEdit} />
									<button type="button" onClick={() => onDelete(row.original.id)}>
										Eliminar
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default TablaUsuarios;