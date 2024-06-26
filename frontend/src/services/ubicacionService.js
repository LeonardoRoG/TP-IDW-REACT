/**
 * Función que se conecta a la API del gobierno para obtener datos referidos a la geolocalización
 * @param {number} lat número correspondiente a la latitud
 * @param {number} lon número correspondiente a la longitud
 * @returns objeto json de la ubicación a la cual pertenecen los datos.
 * ubicacion.
 */
export const obtenerUbicacion = async (lat, lon) => {
    // Aunque tira error al entrar a detallesAlojamiento igual funciona :v
    try {
        const response = await fetch(`https://apis.datos.gob.ar/georef/api/ubicacion?lat=${lat}&lon=${lon}&aplanar=true&campos=estandar`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información.')
        }
        const ubicacion =  await response.json();
        return ubicacion;
    } catch (error) {
        throw error;
    }
}
    