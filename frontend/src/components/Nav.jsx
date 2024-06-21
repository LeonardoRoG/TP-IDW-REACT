import { Link, NavLink } from 'react-router-dom';
import './nav.css';
import { useEffect, useState } from 'react';

export const Nav = () => {

    // Esta lógica es para obtener el ancho actual de la página
    const [actualWidth, setActualWidth] = useState(window.innerWidth);
    const handleWidth = () => {
      setActualWidth(window.innerWidth)
    };
    useEffect(() => {
      window.addEventListener('resize', handleWidth);
      return () => {
        window.removeEventListener('resize', handleWidth);
      };
    }, []);

    // Esta lógica es para abrir o cerrar el menú hamburguesa, agregando o quitando una clase
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    // Cuando hacemos clic en un enlace el menu hamburguesa no se cierra automaticamente, la siguiente lógica permite eso
    document.addEventListener('click', (e) => {
        if (!e.target.matches("nav a")) return false;
        setIsOpen(false);
    });

    // Si el ancho de la página es mayor al nro mostramos el nav completo, sino el menu hamburguesa
    if (actualWidth > 768) {
            return <nav className='nav stroke'>
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
        </nav>
        <i className={`${isOpen ? 'fa-solid fa-xmark menu-icon' : 'fa-solid fa-bars menu-icon' }`} onClick={toggleMenu}></i>
    </div>
    }
}