import './header.css';
import { Logo } from './Logo';
import { Nav } from './Nav';

import React, { useState, useEffect } from "react";


export const Header = () => {

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