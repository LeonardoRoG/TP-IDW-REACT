import { BASE_URL } from "./urlApi";

const url = BASE_URL + 'imagen/';
const headers = { 'Content-Type' : 'application/json' };

export const getAllImagenes = async () => {
    try {
        const response = await fetch(url + 'getAllImagenes');
        if (!response.ok) {
            throw new Error('Error al obtener la información.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addImagen = async (itemData) => {
    try {
        const response = await fetch(url + 'createImagen',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(itemData)
        });
        if (!response.ok) {
            throw new Error('Error al crear la imagen.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getImagen = async (id) => {
    try {
        const response = await fetch(url + 'getImagen/' + id);
        if (!response.ok) {
            throw new Error('Error al obtener los datos.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateImagen = async (id, itemData) => {
    try {
        const response = await fetch(url + 'updateImagen/' + id, {
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

export const deleteImagen = async (id) => {
    try {
        const response = await fetch(url + 'deleteImagen/' + id,{
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