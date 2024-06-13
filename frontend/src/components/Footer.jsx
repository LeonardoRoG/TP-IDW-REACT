import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <footer>
        <div className='contacto-container'>
          <h4>CONTACTO</h4>
          <ul>
            <li><a href="https://www.gmail.com/" ><i className="fa fa-envelope ff-icon"></i>NaturAlma@gmail.com</a></li>  
            <li><a href="https://web.whatsapp.com/"><i className="fa-solid fa-phone ff-icon"></i>123456789</a></li>
            <li><a href="https://www.google.com/maps/"><i className="fa-solid fa-location-dot ff-icon"></i>Monseñor Tavella 1424</a></li>
          </ul>
        </div>
        <div className='secciones-container'>
          <ul className='list'>
            <li><Link to='/'>Inicio</Link></li>
            <li><Link to='/nosotros'>Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
          </ul>
        </div>
        <div className='redes-container'> 
          <h4>NUESTRAS REDES</h4>
          <ul>
            <li><a href="https://www.facebook.com/" className="fa fa-facebook ff-icon"></a></li>
            <li><a href="https://www.instagram.com/" className="fa fa-instagram ff-icon"></a></li>
            <li><a href="https://www.twitter.com/" className="fa-brands fa-x-twitter ff-icon"></a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

