import './header.css';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { Button } from './Button/Button';

import React, { useState, useEffect } from "react";


export const Header = () => {

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

    // Estos métodos son para que el header tenga fondo transparente mientras está arriba
    // Cuando hacemos scroll hacia abajo cambia de color
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const headerClass = scrollPosition !== 0 ? 'header-fixed-top' : 'header-no-fixed';

    return (
        <header className={'header ' + headerClass}>
            <Logo>IDW - CheckIn</Logo>
            <Nav actualWidth={actualWidth}></Nav>
            {actualWidth > 920 && <Button color='warning' rounded={true} icon={'login'}>Registrarse</Button>}
        </header>
    );
}