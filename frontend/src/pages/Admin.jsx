import React from 'react';
import './admin.css';
import { EditTipoAlojamientoForm } from '../Forms/EditTipoAlojamientoForm';
import { Link, Route, Routes } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { TipoAlojamiento } from './admin/TipoAlojamiento';
import { AddTipoAlojamientoForm } from '../Forms/AddTipoAlojamientoForm';
import { Alojamiento } from './admin/Alojamiento';
import { AddAlojamientoForm } from '../Forms/AddAlojamientoForm';
import { EditAlojamientoForm } from '../Forms/EditAlojamientoForm';
import { Servicio } from './admin/Servicio';
import { AddServicioForm } from '../Forms/AddServicioForm';

export const Admin = () => {

    return (
        <div>
            <Hero title={'Administración'} urlImage={'https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_960_720.jpg'}></Hero>
            <main>
                <nav className='nav-menu-admin'>
                    <ul>
                        <li><Link to=''>Dashboard</Link></li>
                        <li><Link to='alojamiento'>Alojamientos</Link></li>
                        <li><Link to='tipoAlojamiento'>Tipos de alojamiento</Link></li>
                        <li><Link to='servicios'>Servicios</Link></li>
                    </ul>
                </nav>
                <section className='admin-container'>
                    <Routes>
                        <Route path='' element={'En construcción'}></Route>
                        <Route path='tipoAlojamiento' element={<TipoAlojamiento></TipoAlojamiento>}></Route>
                        <Route path='tipoAlojamiento/agregar' element={<AddTipoAlojamientoForm></AddTipoAlojamientoForm>}></Route>
                        <Route path='tipoAlojamiento/:id/edit' element={<EditTipoAlojamientoForm></EditTipoAlojamientoForm>}></Route>
                        <Route path='alojamiento' element={<Alojamiento></Alojamiento>}></Route>
                        <Route path='alojamiento/agregar' element={<AddAlojamientoForm></AddAlojamientoForm>}></Route>
                        <Route path='alojamiento/:id/edit' element={<EditAlojamientoForm></EditAlojamientoForm>}></Route>
                        <Route path='servicios' element={<Servicio></Servicio>}></Route>
                        <Route path='servicios/agregar' element={<AddServicioForm></AddServicioForm>}></Route>
                    </Routes>
                </section>
            </main>
        </div>
    )
}
