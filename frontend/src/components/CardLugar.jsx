import './cardLugar.css';
import React from 'react';

export const CardLugar = ({title, subtitle, urlImagen}) => {
    return (
        <div className="card-lugar" style={{backgroundImage: 'url('+urlImagen+')'}}>
            <div className='card-over'>
                <div className="card-lugar-title">
                    <h2>{title}</h2>
                </div>
                <div className="card-lugar-subtitle">
                    <h4>{subtitle}</h4>
                </div>
            </div>
        </div>
    )
}