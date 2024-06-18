import { useEffect, useState } from "react";
import { ListaImagenes } from "../../lists/ListaImagenes";
import { Link } from "react-router-dom";

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
                <Link to={`agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i>Agregar nueva</Link>
            </div>
            <ListaImagenes data={data} eliminar={eliminarImagen}></ListaImagenes>
        </>
    )

}