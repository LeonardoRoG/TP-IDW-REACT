import React from "react";
import { Hero } from "../components/Hero";
import './nosotros.css';

export const Nosotros = () => {
    return (
        <div>
            <Hero title={'Sobre nosotros'} urlImage={'https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg'}></Hero>
            <main className="main-nosotros flex-container">
                <p>En el corazón de la majestuosa naturaleza de Mendoza, Argentina, nació un sueño hace más de 60 años. Todo comenzó con una charla entre amigos, en la que soñábamos con crear un refugio donde los viajeros pudieran encontrar paz y conexión con la naturaleza. Aquella charla se convirtió en nuestro primer proyecto: un pequeño alojamiento en las hermosas tierras de Mendoza, Argentina.</p>
                <p>Desde entonces, hemos crecido y evolucionado, pero nuestro compromiso con la excelencia y la armonía con el entorno natural nunca ha cambiado. Cada alojamiento que construimos es más que un simple edificio; es un santuario donde nuestros huéspedes pueden escapar del bullicio de la vida cotidiana y reconectar consigo mismos y con el mundo que los rodea.</p>
                <p>En NaturAlma, no solo ofrecemos estadías; creamos experiencias memorables. Desde la cálida bienvenida al momento de tu llegada hasta los detalles cuidadosamente diseñados en cada rincón de nuestras instalaciones, cada aspecto de tu estancia está pensado para superar tus expectativas y dejarte con recuerdos imborrables.</p>
                <p>Ya sea que estés buscando una escapada tranquila en la naturaleza o una aventura emocionante llena de actividades al aire libre, en NaturAlma encontrarás el equilibrio perfecto entre comodidad y conexión con la naturaleza.</p>
                <p><strong>¡Bienvenidos a NaturAlma, donde la tranquilidad y la naturaleza se unen para ofrecerte una experiencia inolvidable!</strong></p>
            </main>
        </div>
    )
}