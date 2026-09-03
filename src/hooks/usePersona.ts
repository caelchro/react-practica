import { useCallback, useEffect, useState } from "react";
import { Persona } from "../model/perosna";
import { PersonaService } from "../personas/PersonasApi";
import axios from "axios";

export const usePersona = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [personas, setPersonas] = useState<Persona[]>([]);

    const cargarPersonas = useCallback(() => {
        console.log("usePersona: cargarPersonas...");
        setLoading(true);
        setError(null);
        PersonaService.getPersonas()
            .then((data) => {
                setPersonas(data);
                console.log("Personas cargadas:", data);
            })
            .catch((error) => {
                console.error("Error al cargar:", JSON.stringify(error));
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setError("No se encontraron personas.");
                } else {
                    setError("Se va a acabar el mundo porque Skynet nos dominará.");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const agregarPersona = async (persona: Persona): Promise<void> => {
        console.log("usePersona: agregarPersona...", persona);
        persona.id = personas.length > 0
            ? Math.max(...personas.map(u => u.id)) + 1
            : 1;
        setPersonas(personas => [...personas, { ...persona }]);
    };

    const eliminarPersona = (id: number) => {
        setPersonas(personas => personas.filter(u => u.id !== id));
    };

    useEffect(() => {
        console.log("usePersona: Cargando personas...");
        cargarPersonas();
    }, [cargarPersonas]);
    return { personas, loading, error, cargarPersonas, agregarPersona, eliminarPersona };
};