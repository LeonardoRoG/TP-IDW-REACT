import React from "react";
import './modal.css';
import { Button } from "./Button/Button";

/**
 * Modal personalizado con opción de mostrar ícono, texto y dos botones de acción, siendo uno de éstos opcional
 * @param {string} action - carga el ícono: delete, error, success 
 * @param {string} children - mensaje o fragmento html a mostrar
 * @param {boolean} show - usado para la logica de mostrar o no el modal
 * @param {function} onClose - lógica para botón "cerrar"
 * @param {function} onDelete - opcional: lógica para botón "Si", puede ser de eliminar u otra cosa
 * @param {function} onDelete - opcional: lógica para botón "Si", puede ser de eliminar u otra cosa
 */
export const Modal = ({action, children, show, onClose, onDelete, onAccept}) => {
    if (!show) return null;
    let icon = '';

    switch(action){
        case 'delete':
            icon = (<i className="fa-solid fa-triangle-exclamation icon-modal" style={{color:"orange"}}></i>);
            break;
        case 'error':
            icon = (<i className="fa-solid fa-circle-exclamation icon-modal" style={{color:'crimson'}}></i>);
            break;
        case 'success':
            icon = (<i className="fa-regular fa-circle-check icon-modal"  style={{color:'green'}}></i>);
            break;
        default:
            break;
    };


    return (
        <div className="modal">
            <div className="flex-left">
                {icon}
                <h3>{children}</h3>
            </div>
            <div className="columna-botones">
                {onAccept? <Button onClick={onAccept} color='secondary' grow rounded shadowed>Aceptar</Button> : ''}
                {onDelete? <Button onClick={onDelete} color='danger' grow rounded shadowed>Si</Button> : ''}
                <Button onClick={onClose} color='primary' grow rounded shadowed>Cerrar</Button>
            </div>
        </div>);
};