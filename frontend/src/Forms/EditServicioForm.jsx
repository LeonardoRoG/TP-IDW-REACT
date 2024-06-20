import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";

export const EditServicioForm = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [nombre, setNombre] = useState('');
    const {id} = useParams();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL + 'servicio/getServicio/' + id);
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData);
                setNombre(data.Nombre);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, data.Nombre]);

    const editarServicio = async (e) => {
        e.preventDefault();

        const json ={
            Nombre: nombre
        };

        try {
            const response = await fetch(BASE_URL+ 'servicio/updateServicio/' + id,{
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(json)
            });
            if (response.ok) {
                setModalMsg('Editado con éxito.');
                setModalType('success')
                setShowModal(true);
            } else {
                setModalMsg('Se produjo un error.');
                setModalType('error');
                setShowModal(true);
            }
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const navigate = useNavigate();
    const volver = () => {
        navigate(-1);
    }

    return(
        <>
        <div className="flex-left">
            <h3>Ingrese los nuevos datos del servicio:</h3>
        </div>
        <section className="section-flex">
            <form onSubmit={editarServicio} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="nombre" className="form-label">Nombre del servicio:</label>
                    <input required type="text" id='nombre' name='nombre' value={nombre} onChange={e => setNombre(e.target.value)} className="form-input" placeholder=''/>
                </div>
                <div className='columna-botones'>
                    <Button type='submit' color='warning' icon='edit' grow shadowed rounded>Editar</Button>
                    <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                </div>
                <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
            </form>
        </section>
        </>
    )

}