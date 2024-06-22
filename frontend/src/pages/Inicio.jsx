import { useEffect, useState } from 'react';
import { BusquedaForm } from '../Forms/BusquedaForm';
import { Button } from '../components/Button/Button';
import { CardLugar } from '../components/Cards/CardLugar';
import { Cards } from '../components/Cards/CardsAlojamientos/Cards';
import { Hero } from '../components/Hero';
import './inicio.css';

export const Inicio = () =>{

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
            } catch (error) {
                console.error(error);
            }
        };
        obtenerImagenes();
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

    const [dataAsociados, setDataAsociados] = useState([]);

    useEffect(() => {
        const obtenerServiciosAsociados = async () => {
            try {
                const response = await fetch(BASE_URL + 'alojamientosServicios/getAllAlojamientoServicios');
                const jsonData = await response.json();
                setDataAsociados(jsonData);
            } catch (err){
                console.error(err);
            }
        };
        obtenerServiciosAsociados();
    }, []);

    const [mostrarData, setMostrarData] = useState([]);
    const [childData, setChildData] = useState({
        idTipoAlojamiento: 0,
        precioMax: 0,
        Estado: 'Todos'
    });

    const handleChildData = (dataFromChild) => {
        setChildData(dataFromChild);
    }

    useEffect(() => {
        const filtrarDatos = (item) => {
            return (
                (Number(item.PrecioPorDia) < Number(childData.precioMax)) &&
                (Number(item.idTipoAlojamiento) === Number(childData.idTipoAlojamiento))
            );
        };

        const filtrarTodosPorPrecio = (item) => {
            return (
                (Number(item.PrecioPorDia) < Number(childData.precioMax))
            )
        }

        const filtrarPorTipo = (item) => {
            return (
                (Number(item.idTipoAlojamiento) === Number(childData.idTipoAlojamiento))
            )
        }
    
        if (Number(childData.precioMax) === 0 && Number(childData.idTipoAlojamiento) === 0) {
            setMostrarData(dataCards);
        } else if (Number(childData.precioMax) !== 0 && Number(childData.idTipoAlojamiento) === 0){
            setMostrarData(dataCards.filter(filtrarTodosPorPrecio));
        } else if (Number(childData.precioMax) === 0 && Number(childData.idTipoAlojamiento) !== 0){
            setMostrarData(dataCards.filter(filtrarPorTipo));
        } else {
            setMostrarData(dataCards.filter(filtrarDatos));
        }
    }, [childData, dataCards]);

    return (
        <div className='inicio-section'>
            <Hero urlImage={'./img/lago-home.jpg'} position={'center'}>
                <div className='hero-inicio'>
                    <h1>Viajá por toda la Argentina.</h1>
                    <p>Las mejores experiencias te esperan.</p>
                    <div>
                        <Button icon='send' extrarounded shadowed>Comenzar</Button>
                    </div>
                </div>
            </Hero>
            <h2>Elegí tu destino: </h2>
            {childData? childData.idTipoAlojamiento : null}
            <BusquedaForm onSendData={handleChildData}></BusquedaForm>
            <h2>Alojamientos en oferta</h2>
            <section className='flex-container'>
                <Cards
                    dataCards={mostrarData}
                    dataTipos={dataTipos}
                    dataServicios={dataServicios}
                    dataImagenes={dataImagenes}
                    dataAsociados={dataAsociados}
                ></Cards>
            </section>
            <h2>Destinos destacados</h2>
            <section className='flex-container'>
                <CardLugar title='Cataratas' subtitle='desde $79.000,-' urlImagen='https://cdn.pixabay.com/photo/2014/11/01/01/57/mouth-of-the-iguassu-511500_960_720.jpg'></CardLugar>
                <CardLugar title='Bariloche' subtitle='desde $139.000,-' urlImagen='https://cdn.pixabay.com/photo/2019/02/25/20/23/nature-4020525_960_720.jpg'></CardLugar>
                <CardLugar title='Mar del Plata' subtitle='desde $160.000,-' urlImagen='https://cdn.pixabay.com/photo/2022/06/09/10/13/beach-7252178_1280.jpg'></CardLugar>
            </section>
        </div>
    )
}