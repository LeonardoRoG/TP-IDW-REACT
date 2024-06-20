import { Modal } from "../components/Modal";
import { useState } from "react";
import { Button } from "../components/Button/Button";

export const ListaServicios = ({data, eliminar}) => {

    const [showModal, setShowModal] = useState(false);

    const [idElegido, setIdElegido] = useState('');
    const handleEliminarButton = (idServicio) => {
        setShowModal(true);
        setIdElegido(idServicio);
    }

    return (
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
                                <Button to={`/admin/servicios/${item.idServicio}/edit`} color='warning' icon='edit' shadowed rounded></Button>
                                <Button onClick={() => handleEliminarButton(item.idServicio)} color='danger' icon='delete' shadowed rounded></Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
        </div>
    );
}