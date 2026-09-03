function Buscador({setFiltroName, setFiltroEmail, limpiar}: 
    {setFiltroName: (filtroName: string) => void; setFiltroEmail: (filtroEmail: string) => void; 
        limpiar: () => void}) {
    return (
        <div>
            <h2>Buscador</h2> 
            <input type="text" placeholder="Nombre..." onChange={(e) => setFiltroName(e.target.value)}  />
            <input type="text" placeholder="Email..." onChange={(e) => setFiltroEmail(e.target.value)}  />
            <button type="button" onClick={limpiar}>Limpiar filtros</button>
        </div>
    );
}

export default Buscador;