import { useEffect, useState } from "react";
import { ListaServiciosAsociados } from "../../lists/ListaServiciosAsociados";
import { ListaServicios } from "../../lists/ListaServicios";
import { Button } from "../../components/Button/Button";

export const Servicio = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [data, setData] = useState([]);

    const obtenerServicios = async () => {
        try {
            const response = await fetch(BASE_URL + 'servicio/getAllServicios');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerServicios();
    },[]);

    const [dataAsociados, setDataAsociados] = useState([]);

    const obtenerServiciosAsociados = async () => {
        try {
            const response = await fetch(BASE_URL + 'alojamientosServicios/getAllAlojamientoServicios');
            const jsonData = await response.json();
            setDataAsociados(jsonData);
        } catch (err){
            console.error(err);
        }
    };

    useEffect(() => {
        obtenerServiciosAsociados();
    }, []);

    const eliminarServicio = async (idServicio) => {
        try{
            const response = await fetch(`${BASE_URL}servicio/deleteServicio/${idServicio}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' }
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerServicios();
            } else {
                console.log('Error');
            }
        } catch (err){
            console.error(err);
        }
    };

    const eliminarServicioAsociado = async (idServicioAsociado) => {
        try {
            const response = await fetch(`${BASE_URL}alojamientosServicios/deleteAlojamientoServicio/${idServicioAsociado}`,{
                method: 'DELETE',
                headers: { 'Content-Type' : 'application/json' }
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerServiciosAsociados();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div className="flex-between">
                <h2>Servicios</h2>
                <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
            </div>
            <ListaServicios data={data} eliminar={eliminarServicio}></ListaServicios>
            <div className="flex-between">
                <h2>Servicios Asociados</h2>
                <Button to={'/admin/serviciosAsociados/agregar'} color='primary' rounded shadowed icon='add'>Asociar nuevo</Button>
            </div>
            <ListaServiciosAsociados dataAsociados={dataAsociados} dataServicios={data} eliminar={eliminarServicioAsociado}></ListaServiciosAsociados>
        </>
    )

}