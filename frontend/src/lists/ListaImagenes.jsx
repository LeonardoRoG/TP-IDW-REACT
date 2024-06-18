import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";

export const ListaImagenes = ({data, eliminar}) => {

    const [dataAlojamientos, setDataAlojamientos] = useState([]);
    const BASE_URL = 'http://localhost:3001/'

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch(BASE_URL + 'alojamiento/getAlojamientos');
                const jsonData = await response.json();
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
                                <Link to={`/admin/imagenes/${item.idImagen}/edit`} className="boton warning"><i className="fa-solid fa-pen-to-square ff-icon"></i>Editar</Link>
                                <button className="boton-delete" onClick={() => handleEliminarButton(item.idImagen)}><i className="fa-solid fa-trash ff-icon"></i>Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
        </div>
    );
}