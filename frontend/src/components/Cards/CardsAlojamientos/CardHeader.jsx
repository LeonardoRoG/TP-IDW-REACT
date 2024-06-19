import React from 'react'

export const CardHeader = ({data, dataTipos, dataImagenes}) => {





    const obtenerUrl = (imagenes) => {
        const imagenEncontrada = imagenes.find((imagen) =>
            imagen.idAlojamiento === data.idAlojamiento);
        if (imagenEncontrada) {
            return imagenEncontrada.RutaArchivo;
        } else {
            return 'https://cdn.icon-icons.com/icons2/1744/PNG/512/3643769-building-home-house-main-menu-start_113416.png'
        }
    };

    

    return (
    <div className='card-header'>
        <div className="card-imagen" style={{backgroundImage: `url("${obtenerUrl(dataImagenes)}")`}}>
            <div className='top-header'>
                <div className='fav'>
                    <i className="fa-solid fa-heart"></i>
                </div>
                <div className={`status ${data.Estado === 'Disponible' ? 'disponible' : 'reservado'}`}>
                    <i className="fa-solid fa-circle-dot"></i>
                    <span>{data.Estado}</span>
                </div>
            </div>
        </div>
    </div>
    )
}

