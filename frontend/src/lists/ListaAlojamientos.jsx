import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";

export const ListaAlojamientos = ({ data, eliminar}) => {


    const columns = ['Nro','ID','Titulo','Descripcion','Tipo','Latitud','Longitud','Precio','Dorm.','Baños','Estado','Acciones'];

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
    const [dataTipos, setDataTipos] = useState([]);

    useEffect(() => {
        const obtenerTipos = async () => {
            try{
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                const jsonData = await response.json();
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
                                <td>{item.Latitud}</td>
                                <td>{item.Longitud}</td>
                                <td>{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(item.PrecioPorDia)}</td>
                                <td>{item.CantidadDormitorios}</td>
                                <td>{item.CantidadBanios}</td>
                                <td>{item.Estado}</td>
                                <td className="columna-botones">
                                    <Button color='secondary' rounded shadowed icon={'link'}></Button>
                                    {/* <Link to={`/admin/alojamiento/${item.idAlojamiento}/edit`} className="boton-edit"><i className="fa-solid fa-pen-to-square ff-icon"></i></Link> */}
                                    <Button to={`/admin/alojamiento/${item.idAlojamiento}/edit`} icon='edit' color='warning' rounded shadowed></Button>
                                    {/* <button className="boton-delete" onClick={() => handleEliminarButton(item.idAlojamiento)}><i className="fa-solid fa-trash ff-icon"></i></button> */}
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