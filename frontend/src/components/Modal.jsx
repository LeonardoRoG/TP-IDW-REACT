import React from "react";
import './modal.css';

export const Modal = ({show, onClose, onDelete}) => {
    if (!show) return null;

    return (
        <div className="modal">
            <h3>¿Está seguro que desea eliminar?</h3>
            <div className="columna-botones">
                <button onClick={onDelete} className="boton-delete">Si</button>
                <button onClick={onClose} className="boton-primario">No</button>
            </div>
        </div>
    );
};