
import React from 'react';
import { Hero } from '../components/Hero';
import NosotrosImagenes from '../components/NosotrosImagenes';
import Valoracion from '../components/Valoracion';
import Comentarios from '../components/Comentarios';
import './nosotros.css';

const Nosotros = () => {
    return (
        <div>
            <Hero 
                title={'Nuestra Historia'} 
                urlVideo={'https://cdn.pixabay.com/video/2024/02/22/201473-915698762_large.mp4'} 
                height="65vh"
            />
            <main className="main-nosotros">
                <div className="nosotros-content">
                    <div className="nosotros-text">
                        <p>En el corazón de la majestuosa naturaleza de Mendoza, Argentina, nació un sueño hace más de 60 años. Todo comenzó con una charla entre amigos, en la que soñábamos con crear un refugio donde los viajeros pudieran encontrar paz y conexión con la naturaleza. Aquella charla se convirtió en nuestro primer proyecto: un pequeño alojamiento en las hermosas tierras de Mendoza, Argentina.</p>
                        <p>Desde entonces, hemos crecido y evolucionado, pero nuestro compromiso con la excelencia y la armonía con el entorno natural nunca ha cambiado. Cada alojamiento que construimos es más que un simple edificio; es un santuario donde nuestros huéspedes pueden escapar del bullicio de la vida cotidiana y reconectar consigo mismos y con el mundo que los rodea.</p>
                        <p>En NaturAlma, no solo ofrecemos estadías; creamos experiencias memorables. Desde la cálida bienvenida al momento de tu llegada hasta los detalles cuidadosamente diseñados en cada rincón de nuestras instalaciones, cada aspecto de tu estancia está pensado para superar tus expectativas y dejarte con recuerdos imborrables.</p>
                        <p>Ya sea que estés buscando una escapada tranquila en la naturaleza o una aventura emocionante llena de actividades al aire libre, en NaturAlma encontrarás el equilibrio perfecto entre comodidad y conexión con la naturaleza.</p>
                        <p><strong>¡Bienvenidos a NaturAlma, donde la tranquilidad y la naturaleza se unen para ofrecerte una experiencia inolvidable!</strong></p>
                    </div>
                    <div className="nosotros-imagenes">
                        <NosotrosImagenes />
                    </div>
                </div>
            </main>
            <div className="comentarios-wrapper">
                <Comentarios />
            </div>
            <div className="valoracion-wrapper">
                <Valoracion />
            </div>
        </div>
    );
}

export default Nosotros;





