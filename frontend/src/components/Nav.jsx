import { Link, NavLink } from 'react-router-dom';
import './nav.css';
import { useEffect, useState } from 'react';

export const Nav = () => {

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

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    document.addEventListener('click', (e) => {
        if (!e.target.matches("nav a")) return false;
        setIsOpen(false);
    });

    if (actualWidth > 768) {
            return <nav className='stroke'>
            <ul className='nav-links'>
                <li><NavLink to="/">INICIO</NavLink></li>
                <li><Link to="/nosotros">NOSOTROS</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
            </ul>
        </nav>;
    } else {
        return <div>
        <nav className={`stroke main-nav ${isOpen ? 'open' : ''}`}>
            <ul className='nav-links open'>
                <li><Link to="/">INICIO</Link></li>
                <li><Link to="/nosotros">NOSOTROS</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
            </ul>
        </nav>
        <i className={`${isOpen ? 'fa-solid fa-xmark menu-icon' : 'fa-solid fa-bars menu-icon' }`} onClick={toggleMenu}></i>
    </div>
    }
}