import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";
import { addImagen } from "../services/imagenService";
import { getAllAlojamientos } from "../services/alojamientoService";

export const AddImagenForm = () => {

    const [idAlojamiento, setIdAlojamiento] = useState(0);

    let ruta = '';
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');
    const form = useRef();

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

    const [imageFile, setImageFile] = useState(0);

    const agregarImagen = async (e) => {
        e.preventDefault();

        const urlImgBB = `https://api.imgbb.com/1/upload?key=21922a33fdb2b98ea6c116e0cfd2cde3&name=${imageFile.name}`;
        const data = new FormData();
        data.append("image", imageFile);

        setModalMsg('Cargando...');
        setModalType('success')
        setShowModal(true);
        try {
            const response = await fetch(urlImgBB, {
                method: 'POST',
                body: data
            });
            const responseData = await response.json();
            console.log(responseData);
            ruta = responseData.data.display_url;
        } catch (error) {
            console.error(error);
            setModalMsg('Error en la conexión al servidor.');
            setModalType('error')
            setShowModal(true);
        }

        const json ={
            idAlojamiento: idAlojamiento,
            RutaArchivo: ruta,
        };

        try {
            const response = await addImagen(json);
            setModalMsg(response.message);
            setModalType('success')
            setShowModal(true);
            form.current.reset();
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    }

    const navigate = useNavigate();
    const volver = () => {
        navigate('/admin/imagenes');
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
                    <label htmlFor="ruta" className="form-label">Subir archivo:</label>
                    <input required type="file" id='ruta' name='ruta' onChange={e => setImageFile(e.target.files[0])} className="form-input" placeholder=''/>
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