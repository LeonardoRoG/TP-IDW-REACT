import { useEffect, useState } from "react";
import { obtenerUbicacion } from "../services/ubicacionService";

export const Ubicacion = ({data}) => {

    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    
    useEffect(() => {
        const obtenerCiudad = async () => {
            try {
                const ubicacion = await obtenerUbicacion(Number(data.Latitud), Number(data.Longitud));
                setCiudad(ubicacion.ubicacion.municipio_nombre);
                setProvincia(ubicacion.ubicacion.provincia_nombre);
            } catch (error) {
                
            }
        };
        let segundos = 1;
        const interval = setInterval(() => {
            if (segundos > 0) {
                segundos = segundos - 1;
            } else {
                clearInterval(interval);
                obtenerCiudad();
            }
        }, 1000);
    }, [data.Latitud, data.Longitud]);

    return(
        <>
            {ciudad? ciudad : 'No disponible'}{provincia? `, ${provincia}.` : ''}
        </>
    )
}