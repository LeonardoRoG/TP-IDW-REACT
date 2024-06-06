import { useRef, useState } from 'react';
import './form.css';
import { Modal } from '../components/Modal';
import { Link, useNavigate } from 'react-router-dom';

export const AddTipoAlojamientoForm = () => {

    const [descripcion, setDescripcion] = useState({});
    const form = useRef();

    const [showModal, setShowModal] = useState(false);

    const enviarDatos = async (e) => {
        // Este método previene que se recargue la página
        e.preventDefault();

        // Construimos el objeto con los datos, despues se transforma a json en el body
        const json = {
            Descripcion : descripcion
        };

        // Intentamos la conexion a la api
        try {
            const response = await fetch('http://localhost:3001/tiposAlojamiento/CreateTipoAlojamiento',{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(json)
            });
            const jsonData = await response.json();
            if (response.ok) {
                console.log(jsonData);
                form.current.reset();
                setShowModal(true);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();

    const volver = () => {
        navigate(-1);
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
                    <button type='submit' className='boton-primario grow'><i className="fa-solid fa-plus ff-icon"></i>Agregar</button>
                    <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i> Cancelar</Link>
                </div>
                <Modal message={'Agregado con éxito'} show={showModal} onClose={() => setShowModal(false)}></Modal>
            </form>
        </section>
        </>

    )
    
}