import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const AddImagenForm = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [idAlojamiento, setIdAlojamiento] = useState({});
    const [ruta, setRuta] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');
    const form = useRef();

    const [dataAlojamientos, setDataAlojamientos] = useState([]);

    useEffect(() => {
        const obtenerDatosAlojamientos = async () => {
            try {
                const response = await fetch(BASE_URL + 'alojamiento/getAlojamientos');
                const jsonData = await response.json();
                setDataAlojamientos(jsonData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        obtenerDatosAlojamientos();
    }, []);

    const agregarImagen = async (e) => {
        e.preventDefault();

        const json ={
            idAlojamiento: idAlojamiento,
            RutaArchivo: ruta,
        };

        try {
            const response = await fetch(BASE_URL+ 'imagen/createImagen',{
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
                setModalMsg('Se produjo un error.');
                setModalType('error');
                console.log('error');
            }
        } catch (error) {
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
            <h3>Ingrese los datos de la imagen a agregar:</h3>
        </div>
        <section className="section-flex">
            <form ref={form} onSubmit={agregarImagen} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="idAlojamiento" className="form-label">Seleccione el alojamiento:</label>
                    <select required name="idAlojamiento" id="idAlojamiento" onChange={e => setIdAlojamiento(e.target.value)} defaultValue={'--SELECCIONE--'} className="form-input">
                        <option disabled>--SELECCIONE--</option>
                        {dataAlojamientos.map((item) => (
                            <option key={item.idAlojamiento} value={item.idAlojamiento}>{item.Titulo}</option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="ruta" className="form-label">Ruta del archivo:</label>
                    <input required type="text" id='ruta' name='ruta' onChange={e => setRuta(e.target.value)} className="form-input" placeholder=''/>
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