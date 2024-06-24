import { React, useEffect, useState } from 'react';
import './form.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button/Button';
import { getTipoAlojamiento, putTipoAlojamiento } from '../services/tipoAlojamientoService';

export const EditTipoAlojamientoForm = () => {

    const [descripcion, setDescripcion] = useState('');
    const {id} = useParams();
    const [data, setData] = useState({});
    // navigate es para el botón de volver atrás
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    // Con este método obtenemos los datos del tipo de alojamiento que vamos a actualizar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getTipoAlojamiento(id);
                setData(jsonData);
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
            const response = await putTipoAlojamiento(id, json);
            setModalMsg(response.message);
            setModalType('success')
            setShowModal(true);
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const volver = () => {
        navigate('/admin/tipoAlojamiento');
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
                        <Button type='submit' color='warning' icon='edit' grow shadowed rounded>Editar</Button>
                        <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                    </div>
                    <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
                </form>
            </div>
        </section>

    )
    
}