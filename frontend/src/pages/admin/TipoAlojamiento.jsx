import { useEffect, useState } from "react";
import { ListaTipoAlojamientos } from "../../lists/ListaTipoAlojamientos";
import { Link } from "react-router-dom";
import './adminPages.css';

export const TipoAlojamiento = () => {

    const [data, setData] = useState([]);

    const obtenerTodos = async () => {
        try{
            const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            const jsonData = await response.json();
            setData(jsonData);
        } catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerTodos();
    }, []);

    const eliminar = async (idTipo) =>{
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${idTipo}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' },
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerTodos();
            } else {
                console.log('No se pudo eliminar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Tipos de alojamientos</h2>
                <Link to={`agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i>Agregar nuevo</Link>
            </div>
            <ListaTipoAlojamientos data={data} eliminar={eliminar}></ListaTipoAlojamientos>
        </>
    )
}