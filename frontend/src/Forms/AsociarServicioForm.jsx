import { useEffect, useRef, useState } from "react";
import './form.css';
import { Button } from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const AsociarServicioForm = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [idAlojamiento, setIdAlojamiento] = useState(0);
    const [idServicio, setIdServicio] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const form = useRef();

    const asociarServicio = async (e) => {
        e.preventDefault();

        const json = {
            idAlojamiento : idAlojamiento,
            idServicio : idServicio
        };

        try {
            const response = await fetch(BASE_URL + 'alojamientosServicios/createAlojamientoServicio',{
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
                setShowModal(true);
            }
        } catch (error) {
            console.error(error);
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

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

    const [dataServicios, setDataServicios] = useState([]);

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const response = await fetch(BASE_URL + 'servicio/getAllServicios');
                const jsonData = await response.json();
                setDataServicios(jsonData);
            } catch (err) {
                console.error(err);
            }
        };
        obtenerServicios();
    }, []);

    const navigate = useNavigate();
    const volver = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="flex-left">
                <h3>Seleccione los datos para la relación alojamiento-servicio</h3>
            </div>
            <section className="section-flex">
                <form ref={form} onSubmit={asociarServicio} className="flex-container-center">
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
                        <label htmlFor="idServicio" className="form-label">Seleccione el alojamiento:</label>
                        <select required name="idServicio" id="idServicio" onChange={e => setIdServicio(e.target.value)} defaultValue={'--SELECCIONE--'} className="form-input">
                            <option disabled>--SELECCIONE--</option>
                            {dataServicios.map((item) => (
                                <option key={item.idServicio} value={item.idServicio}>{item.Nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="columna-botones">
                        <Button type='submit' color='primary' icon='add' grow>Enviar</Button>
                        <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i> Cancelar</Link>
                    </div>
                </form>
                <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
            </section>
        </>
    )
}