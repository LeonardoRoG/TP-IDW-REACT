import React, { useEffect, useState } from 'react'
import { ListaAlojamientos } from '../../lists/ListaAlojamientos'
import { Button } from '../../components/Button/Button';
import { getAllAlojamientos, eliminarAlojamiento } from '../../services/alojamientoService';
import { Modal } from '../../components/Modal';

export const Alojamiento = () => {

    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const obtenerDatos = async () => {
        try {
            const jsonData = await getAllAlojamientos();
            setData(jsonData);
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    
    useEffect(() => {
        obtenerDatos();
    }, []);

    const eliminar = async (id) => {
        try {
            const response = await eliminarAlojamiento(id);
            setModalMsg(response.message);
            setModalType('success');
            setShowModal(true);
            obtenerDatos();
        } catch (error) {
            setModalMsg('Ocurrió un error.');
            setModalType('error');
            setShowModal(true);
            console.log(error);
        }
    };

    return (
      <>
          <div className="flex-between">
              <h2>Alojamientos</h2>
              {/* <Link to={`agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i>Agregar nuevo</Link> */}
              <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
          </div>
          <ListaAlojamientos data={data} eliminar={eliminar}></ListaAlojamientos>
          <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
      </>
    )
}
