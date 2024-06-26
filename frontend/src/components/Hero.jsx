import React from "react";
import './hero.css';

export const Hero = ({ title, urlImage, urlVideo, position, children, height }) => {

    if (urlVideo){
        return(
            <section className="hero-container" style={{ height: `${height}` }}>
                <video className="hero-video" src={urlVideo} autoPlay loop muted></video>
                <div className="hero-content">
                    {title && <h2>{title}</h2>}
                    {children}
                </div>
            </section>
        )
    };
    
    return (
        <section className="hero-image-container" style={{backgroundImage: `url("${urlImage}")`, backgroundPosition:`${position}`, height:`${height}`}}>
            {title && <div className="hero-image-text">
                <h2>{title}</h2>
            </div>}
            {children}
        </section>
    );
};

