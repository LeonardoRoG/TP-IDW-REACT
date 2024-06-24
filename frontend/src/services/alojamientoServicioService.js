import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'alojamientosServicios/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllAlojamientoServicios = async () => {
    try {
        const response = await fetch(url + 'getAllAlojamientoServicios');
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
        const response = await fetch(url + 'getAlojamientoServicio/' + id);
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
        const response = await fetch(url + 'getAlojamientoServicios/' + idAlojamiento);
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