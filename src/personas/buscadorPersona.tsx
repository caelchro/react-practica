
function FiltroPersonas({ filtro, onFilter }: { filtro: string; onFilter: (filtro: string) => void }) {

    return (
        <div>
            <input
                type="text"
                name="filtro"
                placeholder="Filtro"
                value={filtro}
                onChange={(e) => onFilter(e.target.value)}
            />
            <button type="submit">Filtrar</button>
            <button type="button" onClick={() => onFilter('')}>Limpiar</button>
        </div>
    );
}

export default FiltroPersonas;