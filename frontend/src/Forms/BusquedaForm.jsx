import React, { useRef, useState } from "react";

import './form.css';
import { Button } from "../components/Button/Button";

export const BusquedaForm = () => {

    const [destino, setDestino] = useState('');
    const [personas, setPersonas] = useState('');
    const form = useRef();

    const buscar = (e) => {
        e.preventDefault();
        const formE = e.target;
        const formData = new FormData(formE);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        form.current.reset();
    };
    
    return (
        <section className="section-flex">
            <div className="flex-container-center">
                <form ref={form} onSubmit={buscar} className="form-buscador">
                    <div className="form-field">
                        <label htmlFor="destino" className="form-label">Destino:</label>
                        <input required type="text" id="destino" name="destino" onChange={e => setDestino(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="personas" className="form-label">Núm. Personas</label>
                        <input type="number" id='personas' min={1} defaultValue={1} name="personas" onChange={e => setPersonas(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <Button type="submit" color='primary' icon='search' name='Buscar'></Button>
                    </div>
                </form>
            </div>
        </section>
    )

}