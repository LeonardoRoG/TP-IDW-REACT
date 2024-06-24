import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'alojamiento/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllAlojamientos = async () => {
    try {
        const response = await fetch(url + 'getAlojamientos');
        if (!response.ok) {
            throw new Error('Error al obtener la información.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addAlojamiento = async (itemData) => {
    try {
        const response = await fetch(url + 'createAlojamiento',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el alojamiento.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAlojamiento = async (id) => {
    try {
        const response = await fetch(url + 'getAlojamiento/' + id);
        if (!response.ok) {
            throw new Error('Error al obtener los datos.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const putAlojamiento = async (id, itemData) => {
    try {
        const response = await fetch(url + 'putAlojamiento/' + id, {
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

export const eliminarAlojamiento = async (id) => {
    try {
        const response = await fetch(url + 'deleteAlojamiento/' + id,{
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