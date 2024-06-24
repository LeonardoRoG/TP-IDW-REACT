import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { getAllAlojamientos } from "../services/alojamientoService";

export const ListaImagenes = ({data, eliminar}) => {

    const [dataAlojamientos, setDataAlojamientos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const jsonData = await getAllAlojamientos();
                setDataAlojamientos(jsonData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        obtenerDatos();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const [idElegido, setIdElegido] = useState(0);
    const handleEliminarButton = (idImagen) => {
        setShowModal(true);
        setIdElegido(idImagen);
    }

    return (
        <div className="flex-container-table">
            <table>
                <thead>
                    <tr>
                        <th>Nro.</th>
                        <th>ID</th>
                        <th>Alojamiento</th>
                        <th>Ruta Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => 
                        <tr key={item.idImagen}>
                            <td>{index + 1}</td>
                            <td>{item.idImagen}</td>
                            <td>
                                {dataAlojamientos.map((alojamiento) => (
                                    alojamiento.idAlojamiento === item.idAlojamiento && alojamiento.Titulo
                                ))}
                            </td>
                            <td>{item.RutaArchivo}</td>
                            <td className="columna-botones">
                                <Button to={`/admin/imagenes/${item.idImagen}/edit`} color='warning' icon='edit' shadowed rounded></Button>
                                <Button onClick={() => handleEliminarButton(item.idImagen)} color='danger' icon='delete' shadowed rounded></Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
        </div>
    );
}