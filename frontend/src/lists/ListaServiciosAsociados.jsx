import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal";

export const ListaServiciosAsociados = ({dataAsociados, dataServicios, eliminar}) => {

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

    const [idElegido, setIdElegido] = useState('');
    const handleEliminarButton = (idServicio) => {
        setShowModal(true);
        setIdElegido(idServicio);
    }

    //Ordena los datos segun el id del alojamiento
    dataAsociados.sort((a, b) => a.idAlojamiento - b.idAlojamiento);

    if (!dataAsociados){
        return(
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
                            <th>Alojamiento</th>
                            <th>Servicios</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAsociados.map((item, index) => 
                            <tr key={item.idAlojamientoServicio}>
                                <td>{index + 1}</td>
                                <td>
                                    {dataAlojamientos.map((alojamiento) => (
                                        alojamiento.idAlojamiento === item.idAlojamiento && alojamiento.Titulo
                                    ))}
                                </td>
                                <td>
                                    {dataServicios.map((servicio) => (
                                        servicio.idServicio === item.idServicio && servicio.Nombre
                                    ))}
                                </td>
                                <td className="columna-botones">
                                    <Button to={`/admin/serviciosAsociados/${item.idAlojamientoServicio}/edit`} color='warning' icon='edit' shadowed rounded></Button>
                                    <Button color='danger' icon='delete' onClick={() => handleEliminarButton(item.idAlojamientoServicio)}></Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
            </div>
        )
    }

}