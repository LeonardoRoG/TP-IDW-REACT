import React, { useRef, useState } from "react";

import './form.css';

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
                        <input type="number" id='personas' name="personas" onChange={e => setPersonas(e.target.value)} className="form-input" placeholder=""/>
                    </div>
                    <div className="form-field">
                        <button type="submit" className="boton-primario"><i className="fa-solid fa-magnifying-glass ff-icon"></i> Buscar</button>
                    </div>
                </form>
            </div>
        </section>
    )

}