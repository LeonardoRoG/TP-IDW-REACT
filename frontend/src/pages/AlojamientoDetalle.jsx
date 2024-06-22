import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero"
import { useEffect, useState } from "react";
import './alojamientoDetalle.css';
import { TypePill } from "../components/Cards/CardsAlojamientos/TypePill";
import { StatusPill } from "../components/Cards/CardsAlojamientos/StatusPill";
import { Button } from "../components/Button/Button";

export const AlojamientoDetalle = () => {

    const BASE_URL = 'http://localhost:3001/';

    const {id} = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}alojamiento/getAlojamiento/${id}`);
                const jsonData = await response.json();
                setData(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const [dataImagenes, setDataImagenes] = useState([]);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const response = await fetch(BASE_URL + 'imagen/getAllImagenes');
                const jsonData = await response.json();
                setDataImagenes(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerImagenes();
    }, []);

    const [dataTipo, setDataTipo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}tiposAlojamiento/getTiposAlojamiento`);
                const jsonData = await response.json();
                setDataTipo(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [dataServicios, setDataServicios] = useState([]);

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const response = await fetch(BASE_URL + 'servicio/getAllServicios');
                const jsonData = await response.json();
                setDataServicios(jsonData);
            } catch (err) {
                console.error(err);
            }
        };
        obtenerServicios();
    }, []);

    const [dataServiciosAloj, setDataServiciosAloj] = useState([]);

    useEffect(() => {
        const obtenerDatosServAloj = async () => {
            try {
                const response = await fetch(`${BASE_URL}alojamientosServicios/getAlojamientoServicios/${id}`);
                const jsonData = await response.json();
                setDataServiciosAloj(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerDatosServAloj();
    }, [id]);


    const obtenerUrl = (imagenes) => {
        const imagenEncontrada = imagenes.find((imagen) =>
            imagen.idAlojamiento === data.idAlojamiento);
        if (imagenEncontrada) {
            return imagenEncontrada.RutaArchivo;
        } else {
            return 'https://cdn.icon-icons.com/icons2/1744/PNG/512/3643769-building-home-house-main-menu-start_113416.png'
        }
    };

    return(
        <>
            <Hero title={data.Titulo} urlImage={obtenerUrl(dataImagenes)} heigth={'30vh'} position={'center'}></Hero>
            <main className="main-detalle">
                <section className="detalle-section-carrusel">
                    <h3>Galería de imágenes</h3>
                    <div className="detalle-carrusel">
                        {dataImagenes.map((img) => (
                            img.idAlojamiento === data.idAlojamiento && <img key={img.idImagen} src={img.RutaArchivo} alt="" />
                        ))}
                    </div>
                </section>
                <section className="detalle-section">
                    <div className="detalle-pills">
                        <TypePill item={data} dataTipos={dataTipo}></TypePill>
                        <StatusPill data={data} on></StatusPill>
                    </div>
                    <p className='location'>Ubicación</p>
                    <h2>{data.Titulo}</h2>
                    <p>{data.Descripcion}</p>
                    <div className="detalle-servicios">
                        <p>Este alojamiento ofrece: </p>
                        <div className="lista-servicios">
                            <span className="servicios-item"><i className="fa-solid fa-bed"></i> {data.CantidadDormitorios}</span>
                            <span className="servicios-item"><i className="fa-solid fa-toilet"></i> {data.CantidadBanios}</span>
                            {dataServiciosAloj.map((item) => {
                                const servicio = dataServicios.find((servicio) => servicio.idServicio === item.idServicio);
                                return (
                                    <span className="servicios-item" key={item.idAlojamientoServicio}>
                                        {servicio ? servicio.Nombre : 'Servicio no encontrado'}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <div className="detalle-footer">
                <div>
                    <i>Precio por día:</i>
                    <p>{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(data.PrecioPorDia)}</p>
                </div>
                <div>
                    <Button icon='add' extrarounded shadowed color='primary' disabled={data.Estado === 'Reservado'}>Reservar</Button>
                </div>
            </div>

        </>
    )
}