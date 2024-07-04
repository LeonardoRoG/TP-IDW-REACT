import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'alojamientosServicios/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllAlojamientoServicios = async () => {
    try {
        const response = await fetch(url + 'getAllAlojamientoServicios', {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Error al obtener la información.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addAlojamientoServicio = async (itemData) => {
    try {
        const response = await fetch(url + 'createAlojamientoServicio',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el Alojamientosservicio.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAlojamientoServicio = async (id) => {
    try {
        const response = await fetch(url + 'getAlojamientoServicio/' + id, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Error al obtener los datos.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAlojamientoServicios = async (idAlojamiento) => {
    try {
        const response = await fetch(url + 'getAlojamientoServicios/' + idAlojamiento, {
            method: 'GET',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Error al obtener los datos.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateAlojamientoServicio = async (id, itemData) => {
    try {
        const response = await fetch(url + 'updateAlojamientoServicio/' + id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(itemData)
        })
        if (!response.ok) {
            throw new Error('Error al actualizar item.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteAlojamientoServicio = async (id) => {
    try {
        const response = await fetch(url + 'deleteAlojamientoServicio/' + id,{
            method: 'DELETE',
            headers: headers
        });
        if (!response.ok) {
            throw new Error('Error al eliminar');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteAlojamientoServiciosAsociados = async (id) => {
    try {
        const response = await fetch(url + 'getAlojamientoServicios/' + id);
        if (!response.ok) {
            throw new Error('Error al obtener servicios asociados.')
        }
        const serviciosAsociados = await response.json();

        if(!Array.isArray(serviciosAsociados)){
            throw new Error('Error en los datos obtenidos.');
        }

        for(const servicio of serviciosAsociados){
            const eliminar = await fetch(url + 'deleteAlojamientoServicio/' + servicio.idAlojamientoServicio,{
                method: 'DELETE',
                headers: headers
            });
            if(!eliminar.ok){
                throw new Error('Error al eliminar servicios asociados.')
            }
        }
        console.log('Eliminados');
    } catch (error) {
        throw error;
    }
}