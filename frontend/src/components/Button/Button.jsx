import './button.css';

/** Componente de boton
 * @param {string} type - El mismo type de un boton comun.
 * @param {string} color - Color: primary, warning, danger o sin valor.
 * @param {string} name - El nombre que se muestra en el boton.
 * @param {boolean} rounded - Bordes redondeados.
 * @param {boolean} grow - Grow flex 1 adaptable si la clase padre es flex.
 * @param {boolean} shadowed - Botón con sombra.
 * @param {string} icon - Icono a mostrar: edit, delete, add, send, search, cancel, login
 * @param onClick - funcion onClick
 */
export const Button = ({type, color, onClick, children, icon, rounded, grow, shadowed}) => {

    const iconMappings = {
        delete: 'fa-solid fa-trash',
        edit: 'fa-solid fa-pen-to-square',
        add: 'fa-solid fa-plus',
        send: 'fa-solid fa-arrow-right',
        search: 'fa-solid fa-magnifying-glass',
        cancel: 'fa-solid fa-xmark',
        login: 'fa-solid fa-right-to-bracket'
    };
      
    const iconClass = iconMappings[icon] || '';

    let styles = '';
    if(rounded) styles += ' rounded ';
    if(grow) styles += ' grow ';
    if(shadowed) styles += ' shadowed ';
    

    return(
        <button type={type} className={'boton ' + styles + ' ' + color} onClick={onClick}>{icon && <i className={"ff-icon-bt " + iconClass}></i>}{children}</button>
    )

}