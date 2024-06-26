
import React, { useState } from 'react';
import './Valoracion.css';

const Valoracion = () => {
    const [valoracion, setValoracion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valoracion && comentario) {
            setComentarios([...comentarios, { valoracion, comentario }]);
            setValoracion(0);
            setComentario('');
        }
    };

    return (
        <div className="valoracion-container">
            <h2>Danos tu Valoración</h2>
            <form onSubmit={handleSubmit}>
                <div className="estrellas">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${valoracion >= star ? 'filled' : ''}`}
                            onClick={() => setValoracion(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="etiquetas">
                    <span>{valoracion === 1 ? 'Muy mala' : ''}</span>
                    <span>{valoracion === 2 ? 'Mala' : ''}</span>
                    <span>{valoracion === 3 ? 'Aceptable' : ''}</span>
                    <span>{valoracion === 4 ? 'Buena' : ''}</span>
                    <span>{valoracion === 5 ? 'Excelente' : ''}</span>
                </div>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            <div className="comentarios">
                {comentarios.map((com, index) => (
                    <div key={index} className="comentario">
                        <div className="valoracion">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`star ${i < com.valoracion ? 'filled' : ''}`}>★</span>
                            ))}
                        </div>
                        <p>{com.comentario}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Valoracion;

