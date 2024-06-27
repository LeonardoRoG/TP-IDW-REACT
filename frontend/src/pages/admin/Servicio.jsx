import { useEffect, useState } from "react";
import { ListaServiciosAsociados } from "../../lists/ListaServiciosAsociados";
import { ListaServicios } from "../../lists/ListaServicios";
import { Button } from "../../components/Button/Button";
import { deleteServicio, getAllServicios } from "../../services/servicioService";
import { Modal } from "../../components/Modal";
import { getAllAlojamientoServicios } from "../../services/alojamientoServicioService";

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
        const servicioAEliminar = dataAsociados.find(item => item.idServicio === idServicio);
        if (servicioAEliminar) {
            setModalMsg('No se puede eliminar. Hay alojamientos ofreciendo este servicio.');
            setModalType('error');
            setShowModal(true);
            return false;
        }
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

    return(
        <>
            <div className="flex-between">
                <h2>Servicios</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
            </div>
            <ListaServicios data={data} eliminar={eliminarServicio}></ListaServicios>
            <div className="flex-between">
                <h2>Servicios ofrecidos por alojamiento</h2>
            </div>
            <ListaServiciosAsociados dataAsociados={dataAsociados} dataServicios={data}></ListaServiciosAsociados>
            <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
        </>
    )

}