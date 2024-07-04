import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'servicio/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllServicios = async () => {
    try {
        const response = await fetch(url + 'getAllServicios', {
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

export const addServicio = async (itemData) => {
    try {
        const response = await fetch(url + 'createServicio',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el servicio.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getServicio = async (id) => {
    try {
        const response = await fetch(url + 'getServicio/' + id, {
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

export const updateServicio = async (id, itemData) => {
    try {
        const response = await fetch(url + 'updateServicio/' + id, {
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

export const deleteServicio = async (id) => {
    try {
        const response = await fetch(url + 'deleteServicio/' + id,{
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