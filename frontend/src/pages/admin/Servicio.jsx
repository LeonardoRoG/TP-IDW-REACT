import { useEffect, useState } from "react";
import { ListaServiciosAsociados } from "../../lists/ListaServiciosAsociados";
import { ListaServicios } from "../../lists/ListaServicios";
import { Button } from "../../components/Button/Button";
import { deleteServicio, getAllServicios } from "../../services/servicioService";
import { Modal } from "../../components/Modal";
import { deleteAlojamientoServicio, getAllAlojamientoServicios } from "../../services/alojamientoServicioService";

export const Servicio = () => {

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const obtenerServicios = async () => {
        try {
            const jsonData = await getAllServicios();
            setData(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerServicios();
    },[]);

    const [dataAsociados, setDataAsociados] = useState([]);

    const obtenerServiciosAsociados = async () => {
        try {
            const jsonData = await getAllAlojamientoServicios();
            setDataAsociados(jsonData);
        } catch (err){
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerServiciosAsociados();
    }, []);

    const eliminarServicio = async (idServicio) => {
        try{
            const response = await deleteServicio(idServicio);
            setModalMsg(response.message);
            setModalType('success');
            setShowModal(true);
            obtenerServicios();
        } catch (err){
            setModalMsg('Ocurrió un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const eliminarServicioAsociado = async (idServicioAsociado) => {
        try {
            const response = await deleteAlojamientoServicio(idServicioAsociado);
            setModalMsg(response.message);
            setModalType('success');
            setShowModal(true);
            obtenerServiciosAsociados();
        } catch (error) {
            setModalMsg('Ocurrió un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Servicios</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
            </div>
            <ListaServicios data={data} eliminar={eliminarServicio}></ListaServicios>
            <div className="flex-between">
                <h2>Servicios Asociados</h2>
                <Button to={'/admin/serviciosAsociados/agregar'} color='primary' rounded shadowed icon='add'>Asociar nuevo</Button>
            </div>
            <ListaServiciosAsociados dataAsociados={dataAsociados} dataServicios={data} eliminar={eliminarServicioAsociado}></ListaServiciosAsociados>
            <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
        </>
    )

}