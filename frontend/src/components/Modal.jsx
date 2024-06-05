import React from "react";
import './modal.css';

export const Modal = ({action, message, show, onClose, onDelete}) => {
    if (!show) return null;

    switch(action){
        case 'delete':
            message = (
                <div className="flex-left">
                    <i className="fa-solid fa-triangle-exclamation icon-modal" style={{color:"orange"}}></i>
                    <h3>{message}</h3>
                </div>
                );
            break;
        default:
            message = (
                <div className="flex-left">
                    <i className="fa-regular fa-circle-check icon-modal"></i>
                    <h3>{message}</h3>
                </div>
                );
            break;
    };


    return (
        <div className="modal">
            {message}
            <div className="columna-botones">
                {onDelete? <button onClick={onDelete} className="boton-delete">Si</button> : ''}
                <button onClick={onClose} className="boton-primario">Cerrar</button>
            </div>
        </div>);
};