import React from "react";
import './hero.css';

export const Hero = ({title, urlImage}) => {

    return (
        <section className="hero-image-container" style={{backgroundImage: `url("${urlImage}")`}}>
            <div className="hero-image-text">
                <h2>{title}</h2>
            </div>
        </section>
    )
}