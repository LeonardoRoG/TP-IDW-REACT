import { useState } from 'react';
import './form.css';

export const AddTipoAlojamiento = () => {

    const [descripcion, setDescripcion] = useState({});

    const enviarDatos = async (e) => {
        // Este método previene que se recargue la página
        e.preventDefault();

        // Construimos el objeto con los datos, despues se transforma a json en el body
        const json = {
            Descripcion : descripcion
        };

        // Intentamos la conexion a la api
        try {
            const response = await fetch('http://localhost:3001/tiposAlojamiento/CreateTipoAlojamiento',{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(json)
            });
            const jsonData = await response.json();
            if (response.ok) {
                alert('Creado correctamente');
                console.log(jsonData);
            } else {
                alert('Error')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="section-flex">
            <form onSubmit={enviarDatos} className="flex-container-center">
                <div className="form-field">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <input type="text" id='descripcion' name='descripcion' onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder=''/>
                </div>
                <div className='form-field'>
                    <button type='submit' className='boton-primario'><i className="fa-solid fa-arrow-right buscar-icon"></i>Agregar</button>
                </div>
            </form>
        </section>
    )
    
}