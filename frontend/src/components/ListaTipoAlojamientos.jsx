import { useEffect, useState } from 'react';
import './listaTipoAlojamientos.css';
import { Link } from 'react-router-dom';

export const ListaTipoAlojamientos = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data]);

    const eliminar = async (idTipo) =>{
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${idTipo}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' },
            });
            if (response.ok) {
                console.log('Eliminado');
            } else {
                console.log('No se pudo eliminar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="flex-container">
            <table>
                <thead>
                    <tr>
                        <th>Nro.</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => 
                        <tr key={item.idTipoAlojamiento}>
                            <td>{index + 1}</td>
                            <td>{item.Descripcion}</td>
                            <td className="columna-botones">
                                <Link to={`/tipoAlojamiento/${item.idTipoAlojamiento}/edit`} className="boton-edit"><i className="fa-solid fa-pen-to-square ff-icon"></i> Editar</Link>
                                <button className="boton-delete" onClick={() => eliminar(item.idTipoAlojamiento)}><i className="fa-solid fa-trash ff-icon"></i> Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}