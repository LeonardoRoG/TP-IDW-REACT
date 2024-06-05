import React from 'react';
import './contacto.css';
import { Hero } from "../components/Hero";

export const Contacto = () => {
  return (
    <main>
      <div className="contenedor">
      <Hero title={'¡Contactanos!'} urlImage={"https://cdn.pixabay.com/photo/2018/03/14/18/05/alpine-hut-3225908_1280.jpg" }></Hero>
      </div>
      
      <h2 className='titulo-form'>Formulario de Contacto</h2>
      
      <div className="container1">
        <section className="section1">
          <form action="procesar_formulario.php" method="POST">
            <label htmlFor="nombre">Nombre:</label><br />
            <input type="text" id="nombre" name="nombre" required /><br /><br />
  
            <label htmlFor="email">Email:</label><br />
            <input type="email" id="email" name="email" required /><br /><br />
  
            <label htmlFor="telefono">Teléfono:</label><br />
            <input type="tel" id="telefono" name="telefono" /><br /><br />
  
            <label htmlFor="mensaje">Mensaje:</label><br />
            <textarea id="mensaje" name="mensaje" rows="4" cols="50" required></textarea><br /><br />
  
            <input type="submit" value="Enviar" />
          </form>
        </section>
    
        <section className="mapa-section">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3406.1539913398474!2d-58.0224524!3d-31.3823172!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ade8161e0ef8c7%3A0x732306b63f61c0e2!2sFacultad%20de%20Ciencias%20de%20la%20Administraci%C3%B3n%20(UNER)!5e0!3m2!1ses!2sar!4v1714686124807!5m2!1ses!2sar" 
          />
        </section>
      </div>
    </main>
  );
};

