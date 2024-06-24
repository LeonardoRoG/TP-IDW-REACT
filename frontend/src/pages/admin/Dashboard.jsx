import { useEffect, useState } from "react"
import { getAllAlojamientos } from "../../services/alojamientoService";
import { getAllTiposAlojamientos } from "../../services/tipoAlojamientoService";
import { getAllServicios } from "../../services/servicioService";
import { Button } from "../../components/Button/Button";

export const Dashboard = () => {

    const [dataAlojamientos, setDataAlojamientos] = useState([]);
    const [dataTipos, setDataTipos] = useState([]);
    const [dataServicios, setDataServicios] = useState([]);

    useEffect(() => {
        const obtenerAlojamientos = async () => {
            const json = await getAllAlojamientos();
            setDataAlojamientos(json);
        }
        obtenerAlojamientos();
    }, []);

    useEffect(() => {
        const obtenerTipos = async () => {
            const json = await getAllTiposAlojamientos();
            setDataTipos(json);
        }
        obtenerTipos();
    }, []);

    const obtenerDisponibles = (item) => {
        if (item.Estado === 'Disponible'){
            return item;
        }
        return null;
    };
    const obtenerReservados = (item) => {
        if (item.Estado === 'Reservado'){
            return item;
        }
        return null;
    };
    const obtenerIngresos = () => {
        const reservados = dataAlojamientos.filter(obtenerReservados);
        let total = 0
        reservados.forEach((item) => {
            total += Number(item.PrecioPorDia);
        })
        return total;
    }
    const total = obtenerIngresos();

    useEffect(() => {
        const obtenerServicios = async () => {
            const json = await getAllServicios();
            setDataServicios(json);
        }
        obtenerServicios();
    }, []);

    return (
        <>
            <div className="flex-between">
                <h2>Dashboard</h2>
                <Button icon='download' color='primary' rounded shadowed>Descargar PDF resumen</Button>
            </div>
            <section className="dashboard-content">
                <div className="dashboard-card">
                    <p>Total de alojamientos</p>
                    <h3>{dataAlojamientos.length}</h3>
                </div>
                <div className="dashboard-card">
                    <p>Alojamientos disponibles</p>
                    <h4>{dataAlojamientos.filter(obtenerDisponibles).length}</h4>
                    <p>Alojamientos reservados</p>
                    <h4>{dataAlojamientos.filter(obtenerReservados).length}</h4>
                </div>
                <div className="dashboard-card">
                    <p>Tipos de alojamiento ofrecidos</p>
                    <h4>{dataTipos.length}</h4>
                </div>
                <div className="dashboard-card">
                    <p>Total de servicios ofrecidos</p>
                    <h4>{dataServicios.length}</h4>
                </div>
                <div className="dashboard-card">
                    <p>Ingresos diarios(*)</p>
                    <h4>{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(total)}</h4>
                    <p>*Según alojamientos ocupados</p>
                </div>
            </section>
        </>
    )
}