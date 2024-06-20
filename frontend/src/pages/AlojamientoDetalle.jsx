import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero"
import { useEffect, useState } from "react";
import './alojamientoDetalle.css';
import { TypePill } from "../components/Cards/CardsAlojamientos/TypePill";
import { StatusPill } from "../components/Cards/CardsAlojamientos/StatusPill";

export const AlojamientoDetalle = () => {

    const BASE_URL = 'http://localhost:3001/';

    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}alojamiento/getAlojamiento/${id}`);
                const jsonData = await response.json();
                setData(jsonData);
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
                <div className="detalle-carrusel">
                    {dataImagenes.map((img) => (
                        img.idAlojamiento === data.idAlojamiento && <img src={img.RutaArchivo} alt="" />
                    ))}
                </div>
                <section>
                    <div className="detalle-pills">
                        <TypePill item={data} dataTipos={dataTipo}></TypePill>
                        <StatusPill data={data}></StatusPill>
                    </div>
                    <h2>{data.Titulo}</h2>
                    <p>{data.Descripcion}</p>
                    <div>

                    </div>
                </section>
            </main>

        </>
    )
}