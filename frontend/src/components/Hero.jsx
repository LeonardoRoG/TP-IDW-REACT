import React from "react";
import './hero.css';

export const Hero = ({ title, urlImage, urlVideo, position, children, height }) => {
    return (
        <section className="hero-container" style={{ height: `${height}` }}>
            {urlVideo ? (
                <video className="hero-video" src={urlVideo} autoPlay loop muted></video>
            ) : (
                <div className="hero-image" style={{ backgroundImage: `url("${urlImage}")`, backgroundPosition: `${position}` }}></div>
            )}
            <div className="hero-content">
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </section>
    );
};

