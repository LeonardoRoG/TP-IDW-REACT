import './App.css';
import { Header } from './components/Header'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Inicio } from './pages/Inicio';
import { Footer } from './components/Footer';
import { Nosotros } from './pages/Nosotros';
import { Contacto } from './pages/Contacto';
import { Admin } from './pages/Admin';
import { AlojamientoDetalle } from './pages/AlojamientoDetalle';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Inicio/>}></Route>
          <Route path='/nosotros' element={<Nosotros></Nosotros>}></Route>
          <Route path='/contacto' element={<Contacto></Contacto>}></Route>
          {/* Acá hay que agregar las otras rutas */}
          <Route path='/admin//*' element={<Admin/>}></Route>
          <Route path='/alojamiento/:id' element={<AlojamientoDetalle></AlojamientoDetalle>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
