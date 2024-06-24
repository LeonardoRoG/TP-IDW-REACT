import React, { useEffect, useRef, useState } from "react";
import { getAllTiposAlojamientos } from "../services/tipoAlojamientoService";
import './form.css';
import { Button } from "../components/Button/Button";

export const BusquedaForm = ({onSendData}) => {

    const [idTipoAlojamiento, setIdTipoAlojamiento] = useState(0);
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(0);
    const [estado, setEstado] = useState('');
    const [cantidadDormitorios, setCantidadDormitorios] = useState(0);
    const [cantidadBanios, setCantidadBanios] = useState(0);
    const form = useRef();

    const [dataTipos, setDataTipos] = useState([]);

    const obtenerTodos = async () => {
        try{
            const jsonData = await getAllTiposAlojamientos();
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
            precioMin: precioMin,
            precioMax: precioMax,
            Estado: estado,
            CantidadDormitorios: cantidadDormitorios,
            CantidadBanios: cantidadBanios
        }
        form.current.reset();
        onSendData(json);
    }

    const limpiarBusqueda = (e) => {
        e.preventDefault()
        setIdTipoAlojamiento(0);
        setPrecioMin(0);
        setPrecioMax(0);
        setEstado('');
        setCantidadBanios(0);
        setCantidadDormitorios(0);

        const json = {
            idTipoAlojamiento: 0,
            precioMin: 0,
            precioMax: 0,
            Estado: "",
            CantidadDormitorios: 0,
            CantidadBanios: 0
        }

        form.current.reset();
        onSendData(json);
    }

    return (
        <section className="section-flex">
            <div className="flex-container-center buscador">
                <h2>Filtros de búsqueda</h2>
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
                        <label htmlFor="precioMin" className="form-label">Precio mínimo(*):</label>
                        <input type="number" id='precioMin' min={0} name="precioMin" value={precioMin} onChange={e => setPrecioMin(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="preciomax" className="form-label">Precio máximo(*):</label>
                        <input type="number" id='preciomax' min={0} name="preciomax" value={precioMax} onChange={e => setPrecioMax(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadDormitorios" className="form-label">Cantidad de dormitorios(*):</label>
                        <input type="number" id='cantidadDormitorios' min={0} name="cantidadDormitorios" value={cantidadDormitorios} onChange={e => setCantidadDormitorios(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadBanios" className="form-label">Cantidad de baños(*):</label>
                        <input type="number" id='cantidadBanios' min={0} name="cantidadBanios" value={cantidadBanios} onChange={e => setCantidadBanios(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="estado" className="form-label">Estado:</label>
                        <select required id="estado" name="estado" onChange={e => setEstado(e.target.value)} value={estado} className="form-input">
                            <option>Todos</option>
                            <option value="Disponible">DISPONIBLE</option>
                            <option value="Reservado">RESERVADO</option>
                        </select>
                    </div>
                    <div className="columna-botones-buscador">
                        <Button onClick={sendChildData} color='primary' rounded shadowed icon='search'>Buscar</Button>
                        <Button onClick={limpiarBusqueda} color='danger' rounded shadowed icon='cancel'>Limpiar</Button>
                    </div>
                </form>
                <span>* Si es 0 se muestran todos los resultados</span>
            </div>
        </section>
    )

}