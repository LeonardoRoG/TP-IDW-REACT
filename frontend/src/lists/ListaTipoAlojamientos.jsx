import { useState } from 'react';
import './listas.css';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button/Button';

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
                                <Button to={`/admin/tipoAlojamiento/${item.idTipoAlojamiento}/edit`} color='warning' icon='edit' shadowed rounded></Button>
                                <Button color='danger' icon='delete' onClick={() => handleEliminarButton(item.idTipoAlojamiento)}></Button>
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