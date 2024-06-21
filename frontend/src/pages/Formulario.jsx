import React from "react";
import './formulario.css';
import { Hero } from '../components/Hero';

export const Formulario = () => {
    return (
        <div className="container-todo">
            <Hero title={''} urlImage={'https://cdn.pixabay.com/photo/2017/04/11/03/33/dinant-2220459_1280.jpg'}>
            <section className="container">
                <form className="formulario">
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required />
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
                
                    <button type="submit">Iniciar sesión</button>
                </form>
            </section>
            </Hero>
        </div>
    );
};
