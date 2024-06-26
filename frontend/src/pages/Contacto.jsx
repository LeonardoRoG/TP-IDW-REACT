import React, { useRef, useState } from 'react';
import './contacto.css';
import { Hero } from "../components/Hero";
import { Modal } from '../components/Modal';
import { Button } from '../components/Button/Button';

export const Contacto = () => {

    const form = useRef();
    const [showModal, setShowModal] = useState(false);

    const contactar = (e) => {
        e.preventDefault();
        const formE = e.target;
        const formData = new FormData(formE);
        setShowModal(true);
        
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        form.current.reset();
    };
  

    return (
        <div className='inicio-section'>
            <Hero title={'¡Contactanos!'} urlImage={"https://cdn.pixabay.com/photo/2018/03/14/18/05/alpine-hut-3225908_1280.jpg"} position={'bottom'}></Hero>
            
            <div className='titulo-form'>
                <h2>Formulario de Contacto</h2>
                <p>Dejanos un mensaje y te responderemos a la brevedad.</p>
            </div>
            
            <main className="section-flex-contacto">
                <section className="flex-container-center limit">
                    <form onSubmit={contactar} ref={form} className='form-contacto'>
                        <div>
                            <h3>Completa los datos:</h3>
                        </div>
                        <div className="form-field">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input required type="text" id="nombre" name="nombre" className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input required type="email" id="email" name="email" className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="telefono" className="form-label">Núm. telefono:</label>
                            <input type="number" id='telefono' name="telefono" className="form-input" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                            <textarea required type="text" id="mensaje" name="mensaje" rows="4" className="form-input textarea" placeholder=""/>
                        </div>
                        <div className="form-field">
                            <Button type="submit" color='primary' rounded shadowed icon='send'>Enviar</Button>
                        </div>
                    </form>
                    <Modal action={'success'} show={showModal} onClose={() => setShowModal(false)}>¡Mensaje enviado!</Modal>
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

