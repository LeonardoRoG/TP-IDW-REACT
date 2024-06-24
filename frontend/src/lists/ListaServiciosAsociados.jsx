import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { getAllAlojamientos } from "../services/alojamientoService";

export const ListaServiciosAsociados = ({dataAsociados, dataServicios}) => {

    const [dataAlojamientos, setDataAlojamientos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const jsonData = await getAllAlojamientos();
                setDataAlojamientos(jsonData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        obtenerDatos();
    }, []);

    //Ordena los datos segun el id del alojamiento
    dataAsociados.sort((a, b) => a.idAlojamiento - b.idAlojamiento);

    if (!dataAsociados){
        return(
        <div className='flex-container'>
            No hay datos.
        </div>);
    } else {
        return(
            <div className="flex-container-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nro.</th>
                            <th>Alojamiento</th>
                            <th>Servicios</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAlojamientos.map((item, index) => 
                            <tr key={item.idAlojamiento}>
                                <td>{index + 1}</td>
                                <td>
                                    {item.Titulo}
                                </td>
                                <td>
                                    {dataServicios.map((servicio) => {
                                        const servicioOfrecido = dataAsociados.find((asoc) =>
                                            asoc.idAlojamiento === item.idAlojamiento && asoc.idServicio === servicio.idServicio
                                        );
                                        if (servicioOfrecido) {
                                            return servicio.Nombre + ', '
                                        }
                                        return null;
                                    })}
                                </td>
                                <td className="columna-botones">
                                    <Button to={`/admin/serviciosAsociados/${item.idAlojamiento}/edit`} color='warning' icon='edit' shadowed rounded></Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

}