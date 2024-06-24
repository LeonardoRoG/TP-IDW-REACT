import { useEffect, useState } from 'react';
import { CardHeader } from './CardHeader';
import './cards.css';
import { Button } from '../../Button/Button';
import { TypePill } from './TypePill';

export const Cards = ({dataCards, dataTipos, dataImagenes, dataServicios, dataAsociados}) => {

    if (dataCards.length > 0){
        return(dataCards.map(item =>
            <div key={item.idAlojamiento} className='card-item'>
                <CardHeader data={item} dataTipos={dataTipos} dataImagenes={dataImagenes}></CardHeader>
                <div className='card-medio'>
                    <TypePill item={item} dataTipos={dataTipos}></TypePill>
                </div>

                <div className='card-principal'>
                    <div className='card-title'>
                        <p className='location'>Ubicación</p>
                        <h3>{item.Titulo}</h3>
                        <p>Precio: {new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(item.PrecioPorDia)}<i> /día</i></p>
                    </div>
                    <div className='card-content'>
                        <p><i className="fa-solid fa-bed"></i> {item.CantidadDormitorios} <i className="fa-solid fa-toilet"></i> {item.CantidadBanios}</p>
                        <p>Incluye 
                            {dataServicios.map((servicio) => {
                                const servicioOfrecido = dataAsociados.find((asoc) =>
                                    asoc.idAlojamiento === item.idAlojamiento && asoc.idServicio === servicio.idServicio
                                );
                                if (servicioOfrecido) {
                                    return ' ' + servicio.Nombre + ','
                                }
                                return null;})}</p>
                    </div>
                    <div className="card-footer">
                        <Button to={`alojamiento/${item.idAlojamiento}`} extrarounded shadowed icon='send'></Button>
                    </div>
                </div>

            </div>
            ))
    } else {
        return('No hay datos.')
    }
}