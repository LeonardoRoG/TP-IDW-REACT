import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'tiposAlojamiento/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllTiposAlojamientos = async () => {
    try {
        const response = await fetch(url + 'getTiposAlojamiento', {
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

export const addTipoAlojamiento = async (itemData) => {
    try {
        const response = await fetch(url + 'CreateTipoAlojamiento',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el tipo de alojamiento.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTipoAlojamiento = async (id) => {
    try {
        const response = await fetch(url + 'getTipoAlojamiento/' + id, {
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

export const putTipoAlojamiento = async (id, itemData) => {
    try {
        const response = await fetch(url + 'putTipoAlojamiento/' + id, {
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

export const eliminarTipoAlojamiento = async (id) => {
    try {
        const response = await fetch(url + 'deleteTipoAlojamiento/' + id,{
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