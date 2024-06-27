import { useEffect, useState } from "react";
import './form.css';
import { Button } from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { addAlojamientoServicio, deleteAlojamientoServiciosAsociados, getAlojamientoServicios } from "../services/alojamientoServicioService";
import { getAlojamiento } from "../services/alojamientoService";
import { getAllServicios } from "../services/servicioService";

export const EditAlojamientoServicioForm = () => {

    const [alojamiento, setAlojamiento] = useState({});
    const [serviciosElegidos, setServiciosElegidos] = useState([]);

    const {id} = useParams();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getAlojamientoServicios(id);
                setServiciosElegidos(jsonData.map(servicio => servicio.idServicio));
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const obtenerDatosAlojamiento = async () => {
            try {
                const jsonData = await getAlojamiento(id);
                setAlojamiento(jsonData);

            } catch (error) {
                console.error('Error: ', error);
            }
        };
        obtenerDatosAlojamiento();
    }, [id]);

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

        try {
            await deleteAlojamientoServiciosAsociados(id);
            setModalMsg('Servicios modificados correctamente.');
            setModalType('success');
            try {
                for (const item of serviciosElegidos) {
                    const json = {
                        idAlojamiento : id,
                        idServicio : item
                    };
                    await addAlojamientoServicio(json);
                    setModalMsg('Servicios modificados correctamente.');
                    setModalType('success');
                }
            } catch (error) {
                setModalMsg('Se produjo un error.');
                setModalType('error');
                setShowModal(true);
            }   
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

    const handleCheckboxChange = (e) => {
        const { name, checked} = e.target;
        const idServicio = Number(name);
        if (checked) {
            setServiciosElegidos([...serviciosElegidos, idServicio])
        } else {
            setServiciosElegidos(serviciosElegidos.filter(servicio => servicio !== idServicio))
        }
    };

    return (
        <>
            <div className="flex-left">
                <h3>Seleccione los nuevos datos para la relación alojamiento-servicio</h3>
            </div>
            <section className="section-flex">
                <form onSubmit={editarAlojamientoServicio} className="flex-container-center">
                    <div className="form-field">
                        <label className="form-label">Alojamiento seleccionado: </label>
                        <h3>{alojamiento.Titulo}</h3>
                    </div>
                    <label htmlFor="idServicio" className="form-label">Seleccione los servicios:</label>
                    <div className="form-field-checkbox">
                            {dataServicios.map((item) => (
                                <div className="item-check" key={item.idServicio}>
                                    <label htmlFor={item.idServicio}>{item.Nombre}</label>
                                    <input type="checkbox" id={item.idServicio} name={item.idServicio} checked={serviciosElegidos.includes(item.idServicio)} onChange={handleCheckboxChange}/>
                                </div>
                            ))}
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