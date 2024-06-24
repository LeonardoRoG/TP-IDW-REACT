import { useEffect, useState } from "react";
import { ListaImagenes } from "../../lists/ListaImagenes";
import { Button } from "../../components/Button/Button";
import { deleteImagen, getAllImagenes } from "../../services/imagenService";
import { Modal } from "../../components/Modal";

export const Imagenes = () => {

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const obtenerImagenes = async () => {
        try {
            const jsonData = await getAllImagenes();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerImagenes();
    }, []);

    const eliminarImagen = async (idImagen) => {
        try {
            const response = await deleteImagen(idImagen);
            setModalMsg(response.message);
            setModalType('success');
            setShowModal(true);
            obtenerImagenes();
        } catch (error) {
            setModalMsg('Ocurrió un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Imágenes</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nueva</Button>
            </div>
            <ListaImagenes data={data} eliminar={eliminarImagen}></ListaImagenes>
            <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
        </>
    )

}