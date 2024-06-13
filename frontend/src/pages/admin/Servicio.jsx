import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Link } from "react-router-dom";

export const Servicio = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const obtenerServicios = async () => {
        try {
            const response = await fetch(BASE_URL + 'servicio/getAllServicios');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerServicios();
    },[]);

    const eliminar = async (idServicio) => {
        try{
            const response = await fetch(`${BASE_URL}servicio/deleteServicio/${idServicio}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' }
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerServicios();
            } else {
                console.log('Error');
            }
        } catch (err){
            console.error(err);
        }
    };
    
    const [idElegido, setIdElegido] = useState('');
    const handleEliminarButton = (idServicio) => {
        setShowModal(true);
        setIdElegido(idServicio);
    }

    return(
        <>
            <div className="flex-between">
                <h2>Servicios</h2>
                <Link to={`agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i>Agregar nuevo</Link>
            </div>
            <div className="flex-container-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nro.</th>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => 
                            <tr key={item.idServicio}>
                                <td>{index + 1}</td>
                                <td>{item.idServicio}</td>
                                <td>{item.Nombre}</td>
                                <td className="columna-botones">
                                    <Link to={`/admin/servicio/${item.idServicio}/edit`} className="boton-edit"><i className="fa-solid fa-pen-to-square ff-icon"></i>Editar</Link>
                                    <button className="boton-delete" onClick={() => handleEliminarButton(item.idServicio)}><i className="fa-solid fa-trash ff-icon"></i>Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Modal action={'delete'} message={'¿Está seguro que desea eliminar?'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}></Modal>
            </div>
        </>
    )

}