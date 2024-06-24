import { useRef, useState } from 'react';
import './form.css';
import { Modal } from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { addTipoAlojamiento } from '../services/tipoAlojamientoService';

export const AddTipoAlojamientoForm = () => {

    const [descripcion, setDescripcion] = useState({});
    const form = useRef();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [actionModal, setActionModal] = useState('');

    const enviarDatos = async (e) => {
        // Este método previene que se recargue la página
        e.preventDefault();

        // Construimos el objeto con los datos, despues se transforma a json en el body
        const json = {
            Descripcion : descripcion
        };

        // Intentamos la conexion a la api
        try {
            const response = await addTipoAlojamiento(json);
            form.current.reset();
            setModalMsg(response.message);
            setActionModal('success');
            setShowModal(true);
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setActionModal('error');
            setShowModal(true);
        }
    };

    const navigate = useNavigate();

    const volver = () => {
        navigate('/admin/tipoAlojamiento');
    }

    return (
        <>
        <div className="flex-left">
            <h3>Ingrese los datos del tipo de alojamiento a agregar</h3>
        </div>
        <section className="section-flex">
            <form ref={form} onSubmit={enviarDatos} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <input required type="text" id='descripcion' name='descripcion' onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder=''/>
                </div>
                <div className='columna-botones'>
                    <Button type='submit' color='primary' grow shadowed rounded icon='add'>Agregar</Button>
                    <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                </div>
                <Modal action={actionModal} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
            </form>
        </section>
        </>

    )
    
}