import React from "react";
import './hero.css';

export const Hero = ({title, urlImage}) => {
    // El atributo title es para poner un título en el centro de la imagen
    // El urlImagen agrega la imagen en el fondo
    return (
        <section className="hero-image-container" style={{backgroundImage: `url("${urlImage}")`}}>
            <div className="hero-image-text">
                <h2>{title}</h2>
            </div>
        </section>
    )
}