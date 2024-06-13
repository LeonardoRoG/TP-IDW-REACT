import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const AddServicioForm = () => {

    const BASE_URL = 'http://localhost:3001/';
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
            const response = await fetch(BASE_URL+ 'servicio/createServicio',{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(json)
            });
            const jsonData = await response.json();
            if (response.ok) {
                console.log(jsonData);
                setModalMsg('Agregado con éxito.');
                setModalType('success')
                setShowModal(true);
                form.current.reset();
            } else {
                console.log('error');
                setModalMsg('Se produjo un error.');
                setModalType('error');
                console.log('error');
            }
        } catch (error) {
            console.log('error');
            setModalMsg('Se produjo un error.');
            setModalType('error');
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const volver = () => {
        navigate(-1);
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
                    <button type='submit' className='boton-primario grow'><i className="fa-solid fa-plus ff-icon"></i>Agregar</button>
                    <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i> Cancelar</Link>
                </div>
                <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
            </form>
        </section>
        </>
    )

}