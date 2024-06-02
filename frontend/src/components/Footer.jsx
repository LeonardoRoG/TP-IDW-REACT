import React from 'react'
import './footer.css';

export const Footer = () => {
  return (
    <div className='container-footer'>
        <footer className="footer">
        <h2 className="texto-redsocial">CONTÁCTANOS!</h2>
        <div className="redsocial-container">
            <a href="https://www.facebook.com/" className="fa fa-facebook"></a>
            <a href="https://www.instagram.com/" className="fa fa-instagram"></a>
            <a href="https://www.gmail.com/" className="fa fa-envelope"></a>
            <a href="https://www.twitter.com/" className="fa-brands fa-x-twitter"></a>
        </div>   
        <div className="texto-footer2">
            <a href="nosotros.html"><u>INFORMACIÓN ACERCA DE NOSOTROS</u></a>
        </div>
    </footer>
    </div>
  )
}
