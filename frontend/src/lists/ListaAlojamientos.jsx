import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";
import { getAllTiposAlojamientos } from "../services/tipoAlojamientoService";

export const ListaAlojamientos = ({ data, eliminar}) => {

    const columns = ['Nro','ID','Titulo','Descripcion','Tipo','Latitud','Longitud','Precio','Dorm.','Baños','Estado','Acciones'];

    const [showModal, setShowModal] = useState(false);

    const [idElegido, setIdElegido] = useState('');
    function handleEliminarButton(idTipoAlojamiento){
        setShowModal(true);
        setIdElegido(idTipoAlojamiento);
    };
    const [dataTipos, setDataTipos] = useState([]);

    useEffect(() => {
        const obtenerTipos = async () => {
            try{
                const jsonData = await getAllTiposAlojamientos();
                setDataTipos(jsonData);
            } catch(err){
                console.error(err);
            }
        };
        obtenerTipos();
    }, []);
    

    if (data.length === 0) {
        return(
            <div className="flex-container">
                No hay datos.
            </div>
        );
    } else {
        return(
            <div className="flex-container-table">
                <table>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.idAlojamiento}>
                                <td>{index + 1}</td>
                                <td>{item.idAlojamiento}</td>
                                <td>{item.Titulo}</td>
                                <td>{item.Descripcion}</td>
                                <td>
                                    {dataTipos.map((tipo) => (
                                        item.idTipoAlojamiento === tipo.idTipoAlojamiento && tipo.Descripcion
                                    ))}
                                </td>
                                <td className="num-column">{item.Latitud}</td>
                                <td className="num-column">{item.Longitud}</td>
                                <td className="num-column">{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(item.PrecioPorDia)}</td>
                                <td>{item.CantidadDormitorios}</td>
                                <td>{item.CantidadBanios}</td>
                                <td>{item.Estado}</td>
                                <td className="columna-botones">
                                    <Button to={`/alojamiento/${item.idAlojamiento}`} target='blank_' color='secondary' rounded shadowed icon='link'></Button>
                                    <Button to={`/admin/alojamiento/${item.idAlojamiento}/edit`} icon='edit' color='warning' rounded shadowed></Button>
                                    <Button color='danger' icon='delete' rounded shadowed onClick={() => handleEliminarButton(item.idAlojamiento)}></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal action={'delete'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}>¿Está seguro que desea eliminar?</Modal>
            </div>
        );
    }

};