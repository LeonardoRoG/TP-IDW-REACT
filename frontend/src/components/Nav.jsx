import { Link, NavLink } from 'react-router-dom';
import './nav.css';
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';

export const Nav = ({actualWidth}) => {

    // Esta lógica es para abrir o cerrar el menú hamburguesa, agregando o quitando una clase
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Cuando hacemos clic en un enlace el menu hamburguesa no se cierra automaticamente, la siguiente lógica permite eso
    useEffect(() => {
        const closeMenuOnClick = (e) => {
            if (!e.target.matches('nav a')) return;
            setIsOpen(false);
        };
        window.addEventListener('click', closeMenuOnClick);
        return () => {
            window.removeEventListener('click', closeMenuOnClick);
        };
    }, []);

    // Si el ancho de la página es mayor al nro mostramos el nav completo, sino el menu hamburguesa
    if (actualWidth > 920) {
            return <nav className='nav nav stroke'>
            <ul className='nav-links'>
                <li><NavLink to="/">INICIO</NavLink></li>
                <li><Link to="/nosotros">NOSOTROS</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
                <li><Link to="/admin">ADMIN</Link></li>
            </ul>
        </nav>;
    } else {
        return <div>
        <nav className={`nav stroke main-nav ${isOpen ? 'open' : ''}`}>
            <ul className='nav-links open'>
                <li><Link to="/">INICIO</Link></li>
                <li><Link to="/nosotros">NOSOTROS</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
                <li><Link to="/admin">ADMIN</Link></li>
            </ul>
            <Button color='warning' rounded={true} icon={'login'}>Registrarse</Button>
        </nav>
        <i className={`${isOpen ? 'fa-solid fa-xmark menu-icon' : 'fa-solid fa-bars menu-icon' }`} onClick={toggleMenu}></i>
    </div>
    }
}