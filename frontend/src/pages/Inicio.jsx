import { useEffect, useRef, useState } from 'react';
import { BusquedaForm } from '../Forms/BusquedaForm';
import { Button } from '../components/Button/Button';
import { CardLugar } from '../components/Cards/CardLugar';
import { Cards } from '../components/Cards/CardsAlojamientos/Cards';
import { Hero } from '../components/Hero';
import { getAllTiposAlojamientos } from '../services/tipoAlojamientoService';
import './inicio.css';
import { getAllAlojamientos } from '../services/alojamientoService';
import { getAllImagenes } from '../services/imagenService';
import { getAllServicios } from '../services/servicioService';
import { getAllAlojamientoServicios } from '../services/alojamientoServicioService';

export const Inicio = () =>{

    const [dataCards, setDataCards] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const jsonData = await getAllAlojamientos();
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
                const jsonData = await getAllTiposAlojamientos();
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
                const jsonData = await getAllImagenes();
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
                const jsonData = await getAllServicios();
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
                const jsonData = await getAllAlojamientoServicios();
                setDataAsociados(jsonData);
            } catch (err){
                console.error(err);
            }
        };
        obtenerServiciosAsociados();
    }, []);

    const [childData, setChildData] = useState({
        idTipoAlojamiento: 0,
        precioMin: 0,
        precioMax: 0,
        Estado: 'Todos',
        CantidadDormitorios: 0,
        CantidadBanios: 0
    });

    const handleChildData = (dataFromChild) => {
        setChildData(dataFromChild);
    };

    const filtrarPorPrecioMin = (item) => {
        if (Number(childData.precioMin) !== 0){
            return (
                (Number(item.PrecioPorDia) > Number(childData.precioMin))
            )
        } else {
            return item;
        }
    };

    const filtrarPorPrecioMax = (item) => {
        if (Number(childData.precioMax) !== 0){
            return (
                (Number(item.PrecioPorDia) < Number(childData.precioMax))
            )
        } else {
            return item;
        }
    };

    const filtrarPorTipo = (item) => {
        if (Number(childData.idTipoAlojamiento) !== 0){
            return (
                (Number(item.idTipoAlojamiento) === Number(childData.idTipoAlojamiento))
            )
        } else {
            return item;
        }
    };

    const filtrarPorEstado = (item) => {
        if (String(childData.Estado) === 'Disponible' || String(childData.Estado) === 'Reservado'){
            return (
                (String(item.Estado) === String(childData.Estado))
            )
        } else {
            return item;
        }
    };

    const filtrarPorDormitorios = (item) => {
        if (Number(childData.CantidadDormitorios) !== 0){
            return (
                (Number(item.CantidadDormitorios) === Number(childData.CantidadDormitorios))
            )
        } else {
            return item;
        }
    };

    const filtrarPorBanios = (item) => {
        if (Number(childData.CantidadBanios) !== 0){
            return (
                (Number(item.CantidadBanios) === Number(childData.CantidadBanios))
            )
        } else {
            return item;
        }
    };

    const sectionRef = useRef();
    const scrollAction = () => {
        if (sectionRef.current) {
            const yOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({top: yOffset -50, behavior: 'smooth'})
        }
    }

    return (
        <div className='inicio-section'>
            <Hero urlImage={'./img/lago-home.jpg'} position={'center'} heigth={'80vh'}>
                <div className='hero-inicio'>
                    <h1>Viajá por toda la Argentina.</h1>
                    <p>Las mejores experiencias te esperan.</p>
                    <div className='boton-comenzar'>
                        <Button onClick={scrollAction} icon='send' extrarounded shadowed>Comenzar</Button>
                    </div>
                </div>
            </Hero>
            <main className='main-inicio'>
                <BusquedaForm onSendData={handleChildData}></BusquedaForm>
                <h2 ref={sectionRef}>Alojamientos en oferta</h2>
                <section className='flex-container' id='datos'>
                    <Cards
                        dataCards={dataCards.filter(filtrarPorPrecioMin)
                            .filter(filtrarPorPrecioMax)
                            .filter(filtrarPorTipo)
                            .filter(filtrarPorEstado)
                            .filter(filtrarPorBanios)
                            .filter(filtrarPorDormitorios)}
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
            </main>
        </div>
    )
}