import { AddTipoAlojamiento } from "../Forms/AddTipoAlojamientoForm"
import { Hero } from "../components/Hero"

export const TipoAlojamiento = () => {
    return (
        <div className="inicio-section">
            <Hero title={'Tipos de alojamiento'} urlImage={'https://cdn.pixabay.com/photo/2021/06/01/06/24/old-town-6300696_1280.jpg'}></Hero>
            <h2>Ingrese los datos del tipo de alojamiento a agregar:</h2>
            <AddTipoAlojamiento></AddTipoAlojamiento>
        </div>
    )
}