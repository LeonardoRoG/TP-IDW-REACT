import { useEffect, useState } from "react";
import './form.css';
import { Button } from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { getAlojamientoServicio, updateAlojamientoServicio } from "../services/alojamientoServicioService";
import { getAllAlojamientos } from "../services/alojamientoService";
import { getAllServicios } from "../services/servicioService";

export const EditAlojamientoServicioForm = () => {

    const [idAlojamiento, setIdAlojamiento] = useState(0);
    const [idServicio, setIdServicio] = useState(0);

    const {id} = useParams();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getAlojamientoServicio(id);
                setData(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        setIdAlojamiento(data.idAlojamiento);
        setIdServicio(data.idServicio);
    }, [id, data.idAlojamiento, data.idServicio]);

    const [dataAlojamientos, setDataAlojamientos] = useState([]);

    useEffect(() => {
        const obtenerDatosAlojamientos = async () => {
            try {
                const jsonData = await getAllAlojamientos();
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
                const jsonData = await getAllServicios();
                setDataServicios(jsonData);
            } catch (err) {
                console.error(err);
            }
        };
        obtenerServicios();
    }, []);

    const editarAlojamientoServicio = async (e) => {
        e.preventDefault();

        const json = {
            idAlojamiento : idAlojamiento,
            idServicio : idServicio
        };

        try {
            const response = await updateAlojamientoServicio(id, json);
            setModalMsg(response.message);
            setModalType('success')
            setShowModal(true);
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

    return (
        <>
            <div className="flex-left">
                <h3>Seleccione los nuevos datos para la relación alojamiento-servicio</h3>
            </div>
            <section className="section-flex">
                <form onSubmit={editarAlojamientoServicio} className="flex-container-center">
                    <div className="form-field">
                        <label htmlFor="idAlojamiento" className="form-label">Seleccione el alojamiento:</label>
                        <select required name="idAlojamiento" id="idAlojamiento" value={idAlojamiento} onChange={e => setIdAlojamiento(e.target.value)} className="form-input">
                            <option disabled>--SELECCIONE--</option>
                            {dataAlojamientos.map((item) => (
                                <option key={item.idAlojamiento} value={item.idAlojamiento}>{item.Titulo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="idServicio" className="form-label">Seleccione el alojamiento:</label>
                        <select required name="idServicio" id="idServicio" value={idServicio} onChange={e => setIdServicio(e.target.value)} className="form-input">
                            <option disabled>--SELECCIONE--</option>
                            {dataServicios.map((item) => (
                                <option key={item.idServicio} value={item.idServicio}>{item.Nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="columna-botones">
                        <Button type='submit' color='warning' icon='edit' grow shadowed rounded>Editar</Button>
                        <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                    </div>
                </form>
                <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
            </section>
        </>
    )
}