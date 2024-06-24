import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";
import { addServicio } from "../services/servicioService";

export const AddServicioForm = () => {

    const [nombre, setNombre] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');
    const form = useRef();

    const agregarServicio = async (e) => {
        e.preventDefault();

        const json ={
            Nombre: nombre
        };

        try {
            const response = await addServicio(json);
            setModalMsg(response.message);
            setModalType('success')
            setShowModal(true);
            form.current.reset();
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const navigate = useNavigate();
    const volver = () => {
        navigate('/admin/servicios');
    }

    return(
        <>
        <div className="flex-left">
            <h3>Ingrese los datos del servicio a agregar</h3>
        </div>
        <section className="section-flex">
            <form ref={form} onSubmit={agregarServicio} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="nombre" className="form-label">Nombre del servicio:</label>
                    <input required type="text" id='nombre' name='nombre' onChange={e => setNombre(e.target.value)} className="form-input" placeholder=''/>
                </div>
                <div className='columna-botones'>
                    <Button type='submit' color='primary' grow shadowed rounded icon='add'>Agregar</Button>
                    <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                </div>
                <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
            </form>
        </section>
        </>
    )

}