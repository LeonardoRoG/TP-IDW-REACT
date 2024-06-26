
import React from 'react';
import './Comentarios.css';

const comentarios = [
    {
        nombre: "Juan Pérez",
        mensaje: "Excelente lugar para relajarse y disfrutar de la naturaleza.",
        valoracion: 5
    },
    {
        nombre: "Ana García",
        mensaje: "Muy buena experiencia, el servicio es excelente.",
        valoracion: 4
    },
    {
        nombre: "Carlos López",
        mensaje: "Buen lugar pero puede mejorar en algunos aspectos.",
        valoracion: 3
    }
];

const Comentarios = () => {
    return (
        <div className="comentarios-container">
            <h2>Comentarios de nuestros visitantes</h2>
            {comentarios.map((comentario, index) => (
                <div key={index} className="comentario">
                    <h3>{comentario.nombre}</h3>
                    <p>{comentario.mensaje}</p>
                    <div className="valoracion">
                        {[...Array(5)].map((star, i) => (
                            <span key={i} className={`star ${i < comentario.valoracion ? 'filled' : ''}`}>★</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comentarios;
