import React from 'react';
import './NosotrosImagenes.css';

const NosotrosImagenes = () => {
    return (
        <section className='imagen-container'>
            <figure>
                <div className='imagen'>
                    <img src='https://cdn.pixabay.com/photo/2019/08/18/04/25/switzerland-4413346_1280.jpg' alt='Alojamiento con piscina' />
                </div>
            </figure>
            <figure>
                <div className='imagen'>
                    <img src='https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_1280.jpg' alt='Alojamiento al mar' />
                </div>
            </figure>
            <figure>
                <div className='imagen'>
                    <img src='https://cdn.pixabay.com/photo/2016/11/08/04/46/jetty-1807471_1280.jpg' alt='Camas' />
                </div>
                
            </figure>
            <figure>
                <div className='imagen'>
                    <img src='https://cdn.pixabay.com/photo/2017/08/07/14/35/woman-2604474_1280.jpg' alt='Alojamiento con piscina' />
                </div>
            </figure>
        </section>
    );
};

export default NosotrosImagenes;

