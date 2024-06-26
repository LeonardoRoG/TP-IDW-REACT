import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal";
import { getImagen, updateImagen } from "../services/imagenService";
import { getAllAlojamientos } from "../services/alojamientoService";

export const EditImagenForm = () => {
    
    const [idAlojamiento, setIdAlojamiento] = useState(0);
    const [rutaArchivo, setRutaArchivo] = useState('');
    const {id} = useParams();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getImagen(id);
                setData(jsonData);
                setIdAlojamiento(data.idAlojamiento);
                setRutaArchivo(data.RutaArchivo);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

    }, [id, data.idAlojamiento, data.RutaArchivo]);

    const [dataAlojamientos, setDataAlojamientos] = useState([]);

    useEffect(() => {
        const obtenerAlojamientos = async () => {
            try {
                const jsonData = await getAllAlojamientos();
                setDataAlojamientos(jsonData);
            } catch (error) {
                console.error('Error al obtener datos de los alojamientos:', error);
            }
        };
        obtenerAlojamientos();
    }, []);

    const editarImagen = async (e) => {
        e.preventDefault();

        const json = {
            idAlojamiento : idAlojamiento,
            RutaArchivo : rutaArchivo
        };

        try {
            const response = await updateImagen(id, json);
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
        navigate('/admin/imagenes');
    }

    return (
        <>
            <div className="flex-left">
                <h3>Ingrese los datos de la imagen a editar:</h3>
            </div>
            <section className="section-flex">
                <form onSubmit={editarImagen} className="flex-container-center">
                    <div className="form-field">
                        <label htmlFor="idAlojamiento" className="form-label">Seleccione el alojamiento:</label>
                        <select required name="idAlojamiento" id="idAlojamiento" onChange={e => setIdAlojamiento(e.target.value)} value={idAlojamiento} className="form-input">
                            <option disabled>--SELECCIONE--</option>
                            {dataAlojamientos.map((item) => (
                                <option key={item.idAlojamiento} value={item.idAlojamiento}>{item.Titulo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="ruta" className="form-label">Ruta del archivo:</label>
                        <input required type="text" id='ruta' name='ruta' defaultValue={rutaArchivo} onChange={e => setRutaArchivo(e.target.value)} className="form-input" placeholder=''/>
                    </div>
                    <div className='columna-botones'>
                        <Button type='submit' color='warning' rounded shadowed grow icon='edit'>Editar</Button>
                        <Button onClick={volver} color='danger' rounded shadowed icon='cancel'>Cancelar</Button>
                    </div>
                    <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
                </form>
            </section>
        </>
    )

}