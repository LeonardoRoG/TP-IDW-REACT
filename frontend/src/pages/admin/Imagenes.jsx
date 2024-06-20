import { useEffect, useState } from "react";
import { ListaImagenes } from "../../lists/ListaImagenes";
import { Button } from "../../components/Button/Button";

export const Imagenes = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [data, setData] = useState([]);

    const obtenerImagenes = async () => {
        try {
            const response = await fetch(BASE_URL + 'imagen/getAllImagenes');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerImagenes();
    }, []);

    const eliminarImagen = async (idImagen) => {
        try {
            const response = await fetch(BASE_URL + 'imagen/deleteImagen/' + idImagen, {
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' }
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerImagenes();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Imágenes</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nueva</Button>
            </div>
            <ListaImagenes data={data} eliminar={eliminarImagen}></ListaImagenes>
        </>
    )

}