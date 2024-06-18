import { useEffect, useState } from 'react';
import { CardHeader } from './CardHeader';
import './cards.css';
import { Button } from '../../Button/Button';

export const Cards = () => {

    // const dataCards = [
    //     {idAlojamiento: 0, titulo: "Mar del Plata", precio: 200000, tipoAlojamiento: "Hotel", urlImagen: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg", cantBanio: 1, cantDor: 2},
    //     {idAlojamiento: 1, titulo: "Bariloche", precio: 1200000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 2, cantDor: 3},
    //     {idAlojamiento: 2, titulo: "La matanza", precio: 180000, tipoAlojamiento: "Casa", urlImagen: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg", cantBanio: 2, cantDor: 4},
    //     {idAlojamiento: 3, titulo: "Palermo", precio: 250000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg", cantBanio: 3, cantDor: 6},
    //     {idAlojamiento: 4, titulo: "Chubut", precio: 90000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg", cantBanio: 1, cantDor: 1},
    //     {idAlojamiento: 5, titulo: "Cataratas", precio: 110000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 1, cantDor: 1},
    //     {idAlojamiento: 6, titulo: "Mar del Plata", precio: 200000, tipoAlojamiento: "Hotel", urlImagen: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg", cantBanio: 1, cantDor: 2},
    //     {idAlojamiento: 7, titulo: "Bariloche", precio: 1200000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 2, cantDor: 3},
    //     {idAlojamiento: 8, titulo: "La matanza", precio: 180000, tipoAlojamiento: "Casa", urlImagen: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg", cantBanio: 2, cantDor: 4},
    //     {idAlojamiento: 9, titulo: "Palermo", precio: 250000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg", cantBanio: 3, cantDor: 6},
    //     {idAlojamiento: 10, titulo: "Chubut", precio: 90000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg", cantBanio: 1, cantDor: 1},
    //     {idAlojamiento: 11, titulo: "Cataratas", precio: 110000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 1, cantDor: 1},
    // ];

    const BASE_URL = 'http://localhost:3001/';
    const [dataCards, setDataCards] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await fetch(BASE_URL + 'alojamiento/getAlojamientos');
                const jsonData = await response.json();
                setDataCards(jsonData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        obtenerDatos();
    }, []);

    const [dataTipos, setDataTipos] = useState([]);

    useEffect(() => {
        const obtenerTipos = async () => {
            try{
                const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
                const jsonData = await response.json();
                setDataTipos(jsonData);
            } catch(err){
                console.error(err);
            }
        };
        obtenerTipos();
    }, []);

    const [dataImagenes, setDataImagenes] = useState([]);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const response = await fetch(BASE_URL + 'imagen/getAllImagenes');
                const jsonData = await response.json();
                setDataImagenes(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerImagenes();
    }, []);

        /**
     * @param {string} string recibe un string
     * @returns string con la primera letra en mayúsculas
     */
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        /**
     * Función para generar colores claros aleatorios
     * @returns código de color
     */
        const generateRandomColor = () => {
            // Genera un color con luminosidad alta (entre 70% y 100%)
            const luminosity = Math.floor(Math.random() * 31) + 70;
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const hexColor = `#${randomColor}`;
            
            // Convierte el color hexadecimal a RGB
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            
            // Calcula la luminosidad del color
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Si la luminosidad es alta, devuelve el color; de lo contrario, genera otro
            return luminance >= luminosity / 100 ? hexColor : generateRandomColor();
        };
    
    if (dataCards.length > 0){
        return(dataCards.map(item =>
            <div key={item.idAlojamiento} className='card-item'>
                <CardHeader data={item} dataTipos={dataTipos} dataImagenes={dataImagenes}></CardHeader>
                <div className='card-medio'>
                    <div className='type-pill' style={{backgroundColor:generateRandomColor()}}>
                        <p>{dataTipos.map((tipo) => (
                            item.idTipoAlojamiento === tipo.idTipoAlojamiento && capitalize(tipo.Descripcion)
                        ))}
                        </p>
                    </div>
                </div>

                <div className='card-principal'>
                    <div className='card-content'>
                        <p className='location'>Ubicación</p>
                        <h3>{item.Titulo}</h3>
                        <p>Precio: {new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(item.PrecioPorDia)}</p>
                        <p><i className="fa-solid fa-bed"></i> {item.CantidadDormitorios} | <i className="fa-solid fa-toilet"></i> {item.CantidadBanios}</p>
                        <p>Servicios que ofrece: </p>
                    </div>
                    <div className="card-footer">
                        <Button extrarounded shadowed icon='send'></Button>
                    </div>
                </div>

            </div>
            ))
    } else {
        return('No hay datos.')
    }
}