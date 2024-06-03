import { React, useEffect, useState } from 'react';
import './form.css';
import { useNavigate, useParams } from 'react-router-dom';

export const EditTipoAlojamientoForm = () => {

    const [descripcion, setDescripcion] = useState({});
    const {id} = useParams();
    const [data, setData] = useState([]);
    // navigate es para el botón de volver atrás
    const navigate = useNavigate();

    // Con este método obtenemos los datos del tipo de alojamiento que vamos a actualizar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/tiposAlojamiento/getTipoAlojamiento/` + id);
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

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
                navigate(-1);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="section-flex">
            <form onSubmit={actualizarDatos} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <input required type="text" id='descripcion' name='descripcion' defaultValue={data.Descripcion} onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder=''/>
                </div>
                <div className='form-field'>
                    <button type='submit' className='boton-edit'><i className="fa-solid fa-arrow-right ff-icon"></i>Editar</button>
                </div>
            </form>
        </section>
    )
    
}