import React from "react";
import './hero.css';

export const Hero = ({title, urlImage}) => {
    // El atributo title es para poner un título en el centro de la imagen
    // El urlImagen agrega la imagen en el fondo
    return (
        <section className="hero-image-container" style={{backgroundImage: `url("${urlImage}")`}}>
            <div className="hero-image-text">
                <h1>{title}</h1>
            </div>
        </section>
    )
}

