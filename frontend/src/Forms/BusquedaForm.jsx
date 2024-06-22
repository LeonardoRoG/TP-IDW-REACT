import React, { useEffect, useRef, useState } from "react";

import './form.css';
import { Button } from "../components/Button/Button";

export const BusquedaForm = ({onSendData}) => {

    const [idTipoAlojamiento, setIdTipoAlojamiento] = useState(0);
    const [precioMax, setPrecioMax] = useState(0);
    const [estado, setEstado] = useState('');
    const form = useRef();

    const [dataTipos, setDataTipos] = useState([]);

    const obtenerTodos = async () => {
        try{
            const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
            const jsonData = await response.json();
            setDataTipos(jsonData);
        } catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerTodos();
    }, []);
    
    const sendChildData = (e) => {
        e.preventDefault();

        const json = {
            idTipoAlojamiento: idTipoAlojamiento,
            precioMax: precioMax,
            Estado: estado
        }

        console.log(json);
        form.current.reset();
        onSendData(json);
    }

    return (
        <section className="section-flex">
            <div className="flex-container-center">
                <form ref={form} className="form-buscador">
                    <div className="form-field">
                        <label htmlFor="idTipoAlojamiento" className="form-label">Tipo de Alojamiento:</label>
                        <select required id="idTpoAlojamiento" name="idTipoAlojamiento" value={idTipoAlojamiento} onChange={e => setIdTipoAlojamiento(e.target.value)} className="form-input" placeholder='--SELECCIONE--'>
                            <option value={0}>Todos</option>
                            {dataTipos.map((item) => 
                                <option key={item.idTipoAlojamiento} value={item.idTipoAlojamiento}>{item.Descripcion.toUpperCase()}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="preciomax" className="form-label">Precio máximo:</label>
                        <input type="number" id='preciomax' min={0} name="preciomax" value={precioMax} onChange={e => setPrecioMax(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="estado" className="form-label">Estado:</label>
                        <select required id="estado" name="estado" onChange={e => setEstado(e.target.value)} value={estado} className="form-input">
                            <option>Todos</option>
                            <option value="Disponible">DISPONIBLE</option>
                            <option value="Reservado">RESERVADO</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <Button onClick={sendChildData} color='primary' rounded shadowed grow icon='search'>Buscar</Button>
                    </div>
                </form>
            </div>
        </section>
    )

}