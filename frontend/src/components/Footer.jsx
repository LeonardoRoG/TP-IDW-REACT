import React from 'react'
import './footer.css';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <footer>
        <div className='contacto-container'>
          <ul>
            <h4>CONTACTO</h4>
            <a href="https://www.gmail.com/" className="fa fa-envelope"></a>
            <li>NaturAlma@gmail.com</li>
            <a href="https://web.whatsapp.com/" className="fa-solid fa-phone"></a>
            <li>123456789</li>
            <a href="https://www.google.com/maps/" className="fa-solid fa-location-dot"></a>
            <li>Monseñor Tavella 1424</li>
          </ul>
        </div>
        <div className='secciones-container'>
          <ul className='list'>
            <li><a href=''>Inicio</a></li>
            <li><a href=''>Sobre Nosotros</a></li>
            <li><a href=''>Contacto</a></li>
            <li><a href=''>Admin</a></li>
          </ul>
          
        </div>
        <div className='redes-container'> 
            <h4>NUESTRAS REDES</h4>
            <a href="https://www.facebook.com/" className="fa fa-facebook"></a>
            <a href="https://www.instagram.com/" className="fa fa-instagram"></a>
            <a href="https://www.twitter.com/" className="fa-brands fa-x-twitter"></a>
        </div>
      </footer>

    </div>
  )
}

