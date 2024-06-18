import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
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
            const jsonData = await response.json();
            if (response.ok) {
                console.log(jsonData);
                setModalMsg('Editado con éxito.');
                setModalType('success')
                setShowModal(true);
            } else {
                console.log('error');
                setModalMsg('Se produjo un error.');
                setModalType('error');
            }
        } catch (error) {
            console.log('error');
            setModalMsg('Se produjo un error.');
            setModalType('error');
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
                    <Button color={'warning'} type='submit' icon='edit' grow>Editar</Button>
                    <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i> Cancelar</Link>
                </div>
                <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
            </form>
        </section>
        </>
    )

}