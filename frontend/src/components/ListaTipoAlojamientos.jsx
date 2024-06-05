import { useEffect, useState } from 'react';
import './listaTipoAlojamientos.css';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

export const ListaTipoAlojamientos = () => {

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const eliminar = async (idTipo) =>{
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${idTipo}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' },
            });
            if (response.ok) {
                console.log('Eliminado');
                setShowModal(false);
                fetchData();
            } else {
                console.log('No se pudo eliminar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [idElegido, setIdElegido] = useState('');
    function handleEliminarButton(idTipoAlojamiento){
        setShowModal(true);
        setIdElegido(idTipoAlojamiento);
    };

    if (data.length === 0) {
        return (
        <div className='flex-container'>
            No hay datos.
        </div>);
    } else {
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
                                <button className="boton-delete" onClick={() => handleEliminarButton(item.idTipoAlojamiento)}><i className="fa-solid fa-trash ff-icon"></i> Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal show={showModal} onDelete={() => eliminar(idElegido)} onClose={() => setShowModal(false)}></Modal>
        </div>
        );
    };
};