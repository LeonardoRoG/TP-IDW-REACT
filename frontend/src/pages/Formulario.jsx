import React from "react";
import './formulario.css';
import { Hero } from '../components/Hero';
import { Button } from "../components/Button/Button";

export const Formulario = () => {
    return (
        <div className="container-todo">
            <Hero title={''} urlImage={'https://cdn.pixabay.com/photo/2017/04/11/03/33/dinant-2220459_1280.jpg'} heigth={'80vh'}>
            <section className="container">
                <form className="formulario">
                    <div>
                        <h2>Iniciar sesión</h2>
                    </div>
                    <div className="form-field">
                        <label htmlFor="username" className="form-label">Usuario:</label>
                        <input type="text" id="username" name="username" className="form-input" placeholder="Ingrese su usuario" required />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input type="password" id="password" name="password" className="form-input" placeholder="Ingrese su contraseña" required />
                    </div>
                    <Button color='primary' rounded shadowed type="submit" icon='login'>Iniciar sesión</Button>
                </form>
            </section>
            </Hero>
        </div>
    );
};
