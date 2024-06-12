import { BusquedaForm } from '../Forms/BusquedaForm';
import { CardLugar } from '../components/Cards/CardLugar';
import { Cards } from '../components/Cards/CardsAlojamientos/Cards';
import { Hero } from '../components/Hero';
import './inicio.css';

export const Inicio = () =>{
    return (
        <div className='inicio-section'>
            <Hero title={'Alojamientos'} urlImage={'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg'}></Hero>
            <h2>Elegí tu destino: </h2>
            <BusquedaForm></BusquedaForm>
            <h2>Alojamientos en oferta</h2>
            <section className='flex-container'>
                <Cards></Cards>
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