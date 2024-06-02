import { BusquedaForm } from '../Forms/BusquedaForm';
import { Cards } from '../components/Cards';
import { Hero } from '../components/Hero';
import './inicio.css';

export const Inicio = () =>{
    return (
        <div className='inicio-section'>
            <Hero title={'Alojamientos'} urlImage={'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg'}></Hero>
            <h2>Elegí tu destino: </h2>
            <BusquedaForm></BusquedaForm>
            <h2>Alojamientos en oferta</h2>
            <Cards></Cards>
        </div>
    )
}