import { Link } from "react-router-dom"
import { ListaTipoAlojamientos } from "../components/ListaTipoAlojamientos"
import './tipoAlojamiento.css';

export const TipoAlojamiento = () => {
    return (
        <div className="inicio-section">
            <div className="empty-div"></div>
            <h2>Administración</h2>
            <hr />
            <h3>Tipos de alojamientos</h3>
            <div className="flex-inline">
                <Link to={`/tipoAlojamiento/agregar`} className="boton-primario"><i class="fa-solid fa-plus ff-icon"></i> Agregar nuevo</Link>
            </div>
            <h3>Todos los tipos de alojamientos</h3>
            <ListaTipoAlojamientos></ListaTipoAlojamientos>
        </div>
    )
}