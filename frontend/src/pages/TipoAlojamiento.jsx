import { Link } from "react-router-dom"
import { ListaTipoAlojamientos } from "../components/ListaTipoAlojamientos"
import './tipoAlojamiento.css';
import { Hero } from "../components/Hero";

export const TipoAlojamiento = () => {
    return (
        <div className="inicio-section">
            <Hero title={'Administración'} urlImage={'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_960_720.jpg'}></Hero>
            <h3>Tipos de alojamientos</h3>
            <div className="flex-inline">
                <Link to={`/tipoAlojamiento/agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i> Agregar nuevo</Link>
            </div>
            <h3>Todos los tipos de alojamientos</h3>
            <ListaTipoAlojamientos></ListaTipoAlojamientos>
        </div>
    )
}