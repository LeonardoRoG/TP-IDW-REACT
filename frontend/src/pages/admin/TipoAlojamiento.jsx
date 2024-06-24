import { useEffect, useState } from "react";
import { ListaTipoAlojamientos } from "../../lists/ListaTipoAlojamientos";
import './adminPages.css';
import { Button } from "../../components/Button/Button";
import { eliminarTipoAlojamiento, getAllTiposAlojamientos } from "../../services/tipoAlojamientoService";
import { Modal } from "../../components/Modal";

export const TipoAlojamiento = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const obtenerTodos = async () => {
        try{
            const jsonData = await getAllTiposAlojamientos();
            setData(jsonData);
        } catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerTodos();
    }, []);

    const eliminar = async (idTipo) =>{
        try {
            const response = await eliminarTipoAlojamiento(idTipo);
            setModalMsg(response.message);
            setModalType('success');
            setShowModal(true);
            obtenerTodos();
        } catch (error) {
            setModalMsg('Ocurrió un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Tipos de alojamientos</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
            </div>
            <ListaTipoAlojamientos data={data} eliminar={eliminar}></ListaTipoAlojamientos>
            <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
        </>
    )
}