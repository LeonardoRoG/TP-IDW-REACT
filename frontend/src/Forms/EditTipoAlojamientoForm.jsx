import { React, useEffect, useState } from 'react';
import './form.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../components/Modal';

export const EditTipoAlojamientoForm = () => {

    const [descripcion, setDescripcion] = useState('');
    const {id} = useParams();
    const [data, setData] = useState({});
    // navigate es para el botón de volver atrás
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Con este método obtenemos los datos del tipo de alojamiento que vamos a actualizar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/` + id);
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData);
                setDescripcion(data.Descripcion);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data.Descripcion, id]);

    const actualizarDatos = async (e) => {
        // Este método previene que se recargue la página
        e.preventDefault();
        

        // Construimos el objeto con los datos, despues se transforma a json en el body
        const json = {
            Descripcion : descripcion
        };

        // Intentamos la conexion a la api
        try {
            const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/` + id,{
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(json)
            });
            const jsonData = await response.json();
            if (response.ok) {
                console.log(jsonData);
                setShowModal(true);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const volver = () => {
        navigate(-1);
    }

    return (
        <section>
            <div className='flex-left'>
                <h3>Ingrese los nuevos valores del tipo de alojamiento:</h3>
            </div>
            <div className="section-flex">
                <form onSubmit={actualizarDatos} className="flex-container-center">
                    <div className="form-field">
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <input required type="text" id='descripcion' name='descripcion' value={descripcion} onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder=''/>
                    </div>
                    <div className='columna-botones'>
                        <button type='submit' className='boton-edit grow'><i className="fa-solid fa-pen-to-square ff-icon"></i>Editar</button>
                        <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i>Cancelar</Link>
                    </div>
                    <Modal action={'success'} show={showModal} onClose={() => navigate(-1)}>Modificado con éxito</Modal>
                </form>
            </div>
        </section>

    )
    
}