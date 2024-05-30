import './header.css';
import { Logo } from './Logo';
import { Nav } from './Nav';

import React, { useState, useEffect } from "react";


export const Header = () => {

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
            <div className="logo">
                <Logo></Logo>
            </div>
            <Nav></Nav>
        </header>
    );
}