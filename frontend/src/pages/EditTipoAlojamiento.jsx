import { useNavigate } from "react-router-dom"
import { EditTipoAlojamientoForm } from "../Forms/EditTipoAlojamientoForm"
import './editTipoAlojamiento.css';

export const EditTipoAlojamiento = () => {
    const navigate = useNavigate();

    const volver = () => {
        navigate(-1);
    }
    return (
        <div className="inicio-section">
            <div className="empty-div"></div>
            <div className="flex-left">
                <button onClick={volver} className="boton-primario"><i className="fa-solid fa-arrow-left ff-icon"></i>Volver</button>
                <h3>Ingrese los nuevos valores del tipo de alojamiento:</h3>
            </div>
            <EditTipoAlojamientoForm></EditTipoAlojamientoForm>
        </div>
    )
}