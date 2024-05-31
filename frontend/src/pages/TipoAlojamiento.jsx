import { AddTipoAlojamiento } from "../Forms/AddTipoAlojamientoForm"
import { ListaTipoAlojamientos } from "../components/ListaTipoAlojamientos"

export const TipoAlojamiento = () => {
    return (
        <div className="inicio-section">
            <div className="empty-div"></div>
            <h2>Administración</h2>
            <hr />
            <h3>Ingrese los datos del tipo de alojamiento a agregar:</h3>
            <AddTipoAlojamiento></AddTipoAlojamiento>
            <h3>Todos los tipos de alojamientos</h3>
            <ListaTipoAlojamientos></ListaTipoAlojamientos>
        </div>
    )
}