import { useState } from 'react';
import './listas.css';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';

export const ListaTipoAlojamientos = ({data, eliminar}) => {

    const [showModal, setShowModal] = useState(false);

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
            <div className="flex-container-table">
            <table>
                <thead>
                    <tr>
                        <th>Nro.</th>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => 
                        <tr key={item.idTipoAlojamiento}>
                            <td>{index + 1}</td>
                            <td>{item.idTipoAlojamiento}</td>
                            <td>{item.Descripcion}</td>
                            <td className="columna-botones">
                                <Link to={`/admin/tipoAlojamiento/${item.idTipoAlojamiento}/edit`} className="boton-edit"><i className="fa-solid fa-pen-to-square ff-icon"></i>Editar</Link>
                                <button className="boton-delete" onClick={() => handleEliminarButton(item.idTipoAlojamiento)}><i className="fa-solid fa-trash ff-icon"></i>Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
        </div>
        );
    };
};