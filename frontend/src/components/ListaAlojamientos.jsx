import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";

export const ListaAlojamientos = ({ data, obtenerDatos, eliminar}) => {

    useEffect(() => {
        obtenerDatos();
    }, []);

    const columns = ['Nro','ID','Titulo','Descripcion','Tipo','Latitud','Longitud','Precio','Dormitorios','Baños','Estado','Acciones'];

    // const data = [
    //     {idAlojamiento: 0, titulo: "Arroz", descripcion: 2000, tipo: "almacen", latitud: 23.443, longitud: 45.333, precio: 20000, dormitorios: 3, baños: 2, estado: 'disponible'},
    //     {idAlojamiento: 1, titulo: "Arroz", descripcion: 2000, tipo: "almacen", latitud: 23.443, longitud: 45.333, precio: 20000, dormitorios: 3, baños: 2, estado: 'disponible'},
    //     {idAlojamiento: 2, titulo: "Arroz", descripcion: 2000, tipo: "almacen", latitud: 23.443, longitud: 45.333, precio: 20000, dormitorios: 3, baños: 2, estado: 'disponible'},
    //     {idAlojamiento: 3, titulo: "Arroz", descripcion: 2000, tipo: "almacen", latitud: 23.443, longitud: 45.333, precio: 20000, dormitorios: 3, baños: 2, estado: 'disponible'},
    //     {idAlojamiento: 4, titulo: "Arroz", descripcion: 2000, tipo: "almacen", latitud: 23.443, longitud: 45.333, precio: 20000, dormitorios: 3, baños: 2, estado: 'disponible'},
    // ]

    const [showModal, setShowModal] = useState(false);

    const [idElegido, setIdElegido] = useState('');
    function handleEliminarButton(idTipoAlojamiento){
        setShowModal(true);
        setIdElegido(idTipoAlojamiento);
    };

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
                                <td>{item.TipoAlojamiento}</td>
                                <td>{item.Latitud}</td>
                                <td>{item.Longitud}</td>
                                <td>{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(item.PrecioPorDia)}</td>
                                <td>{item.CantidadDormitorios}</td>
                                <td>{item.CantidadBanios}</td>
                                <td>{item.Estado}</td>
                                <td className="columna-botones">
                                    <Link to={`/admin/alojamiento/${item.idAlojamiento}/edit`} className="boton-edit"><i className="fa-solid fa-pen-to-square ff-icon"></i></Link>
                                    <button className="boton-delete" onClick={() => handleEliminarButton(item.idAlojamiento)}><i className="fa-solid fa-trash ff-icon"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal action={'delete'} message={'¿Está seguro que desea eliminar?'} show={showModal} onDelete={() => eliminar(idElegido) & setShowModal(false)} onClose={() => setShowModal(false)}></Modal>
            </div>
        );
    }

};