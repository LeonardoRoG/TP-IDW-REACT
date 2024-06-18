import React, { useEffect, useState } from 'react'
import { ListaAlojamientos } from '../../lists/ListaAlojamientos'
import { Button } from '../../components/Button/Button';

export const Alojamiento = () => {

    const BASE_URL = 'http://localhost:3001/';
    const [data, setData] = useState([]);

    const obtenerDatos = async () => {
        try {
            const response = await fetch(BASE_URL + 'alojamiento/getAlojamientos');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    
    useEffect(() => {
        obtenerDatos();
    }, []);

    const eliminar = async (idAlojamiento) => {
        try {
            const response = await fetch(`${BASE_URL}alojamiento/deleteAlojamiento/${idAlojamiento}`,{
                method: 'DELETE',
                headers: { 'Content-Type':'application/json'},
            });
            if (response.ok) {
                console.log('Eliminado');
                obtenerDatos();
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
          <div className="flex-between">
              <h2>Alojamientos</h2>
              {/* <Link to={`agregar`} className="boton-primario"><i className="fa-solid fa-plus ff-icon"></i>Agregar nuevo</Link> */}
              <Button to={`agregar`} color='primary' rounded shadowed icon='add'>Agregar nuevo</Button>
          </div>
          <ListaAlojamientos data={data} eliminar={eliminar}></ListaAlojamientos>
      </>
    )
}
