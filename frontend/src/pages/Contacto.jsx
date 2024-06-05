import React, { useRef, useState } from 'react';
import './contacto.css';
import { Hero } from "../components/Hero";

export const Contacto = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const form = useRef();

    const contactar = (e) => {
        e.preventDefault();
        const formE = e.target;
        const formData = new FormData(formE);
        
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        form.current.reset();
    };
  

    return (
        <div className='inicio-section'>
            <Hero title={'¡Contactanos!'} urlImage={"https://cdn.pixabay.com/photo/2018/03/14/18/05/alpine-hut-3225908_1280.jpg" }></Hero>
            
            <h2 className='titulo-form'>Formulario de Contacto</h2>
            
            <main className="section-flex-contacto">
                <section className="flex-container-center">
                    <form onSubmit={contactar} ref={form}>
                        <div className="form-field">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input required type="text" id="nombre" name="nombre" onChange={e => setNombre(e.target.value)} className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input required type="email" id="email" name="email" onChange={e => setEmail(e.target.value)} className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="telefono" className="form-label">Núm. telefono:</label>
                            <input type="number" id='telefono' name="telefono" onChange={e => setTelefono(e.target.value)} className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                            <textarea required type="text" id="mensaje" name="mensaje" rows="4" onChange={e => setMensaje(e.target.value)} className="form-input textarea" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <button type="submit" className="boton-primario"><i className="fa-solid fa-magnifying-glass ff-icon"></i> Enviar</button>
                        </div>
                    </form>
                </section>
          
                <section className="mapa-section">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3406.1539913398474!2d-58.0224524!3d-31.3823172!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade8161e0ef8c7%3A0x732306b63f61c0e2!2sFacultad%20de%20Ciencias%20de%20la%20Administraci%C3%B3n%20(UNER)!5e0!3m2!1ses!2sar!4v1714686124807!5m2!1ses!2sar" 
                    />
                </section>
            </main>
        </div>
    );
};

