import { CardHeader } from './CardHeader';
import './cards.css';

export const Cards = () => {

    const dataCards = [
        {idAlojamiento: 0, titulo: "Mar del Plata", precio: 200000, tipoAlojamiento: "Hotel", urlImagen: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg", cantBanio: 1, cantDor: 2},
        {idAlojamiento: 1, titulo: "Bariloche", precio: 1200000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 2, cantDor: 3},
        {idAlojamiento: 2, titulo: "La matanza", precio: 180000, tipoAlojamiento: "Casa", urlImagen: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg", cantBanio: 2, cantDor: 4},
        {idAlojamiento: 3, titulo: "Palermo", precio: 250000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg", cantBanio: 3, cantDor: 6},
        {idAlojamiento: 4, titulo: "Chubut", precio: 90000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg", cantBanio: 1, cantDor: 1},
        {idAlojamiento: 5, titulo: "Cataratas", precio: 110000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 1, cantDor: 1},
        {idAlojamiento: 6, titulo: "Mar del Plata", precio: 200000, tipoAlojamiento: "Hotel", urlImagen: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg", cantBanio: 1, cantDor: 2},
        {idAlojamiento: 7, titulo: "Bariloche", precio: 1200000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 2, cantDor: 3},
        {idAlojamiento: 8, titulo: "La matanza", precio: 180000, tipoAlojamiento: "Casa", urlImagen: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg", cantBanio: 2, cantDor: 4},
        {idAlojamiento: 9, titulo: "Palermo", precio: 250000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg", cantBanio: 3, cantDor: 6},
        {idAlojamiento: 10, titulo: "Chubut", precio: 90000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg", cantBanio: 1, cantDor: 1},
        {idAlojamiento: 11, titulo: "Cataratas", precio: 110000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 1, cantDor: 1},
    ];


    if (dataCards.length > 0){
        return(dataCards.map(item =>
            <div key={item.idAlojamiento} className='card-item'>
                <CardHeader data={item}></CardHeader>
                <div className='card-content'>
                    <h3>{item.titulo}</h3>
                    <p>Precio: {item.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                </div>
                <hr></hr>
                <div className="card-footer">
                    <p>Cantidad de dormitorios: {item.cantDor}</p>
                    <p>Cantidad de baños: {item.cantBanio}</p>
                </div>
            </div>
            ))
    } else {
        return('No hay datos.')
    }
}