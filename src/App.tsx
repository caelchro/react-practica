import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Personas from './personas/personas';
import Usuarios from './usuarios/usuarios';

function App() {
	return (
		<BrowserRouter>
			<header className="app-header">
				<div className="app-shell header-content">
					<NavLink className="brand" to="/personas">Panel de datos</NavLink>
					<nav aria-label="Navegación principal" className="main-nav">
						<NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/personas">
							Personas
						</NavLink>
						<NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/usuarios">
							Usuarios
						</NavLink>
					</nav>
				</div>
			</header>

			<main className="app-shell page-content">
				<Routes>
					<Route path="/personas" element={<Personas />} />
					<Route path="/usuarios" element={<Usuarios />} />
					<Route path="*" element={<Navigate to="/personas" replace />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
