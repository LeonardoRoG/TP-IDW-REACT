import React, { useState } from 'react'
import { StatusPill } from './StatusPill';

export const CardHeader = ({data, dataImagenes}) => {

    const obtenerUrl = (imagenes) => {
        const imagenEncontrada = imagenes.find((imagen) =>
            imagen.idAlojamiento === data.idAlojamiento);
        if (imagenEncontrada) {
            return imagenEncontrada.RutaArchivo;
        } else {
            return 'https://cdn.icon-icons.com/icons2/1744/PNG/512/3643769-building-home-house-main-menu-start_113416.png'
        }
    };

    const [clicked, setClicked] = useState(false);
    const addFav = () => {
        setClicked(!clicked);
    }

    return (
    <div className='card-header'>
        <div className="card-imagen" style={{backgroundImage: `url("${obtenerUrl(dataImagenes)}")`}}>
            <div className='top-header'>
                <div onClick={addFav} className={`fav ${clicked? 'added' : ''}`}>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <StatusPill data={data}></StatusPill>
            </div>
        </div>
    </div>
    )
}

