import './App.css';
import { Header } from './components/Header'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Inicio } from './pages/Inicio';
import { TipoAlojamiento } from './pages/TipoAlojamiento';
import { EditTipoAlojamiento } from './pages/EditTipoAlojamiento';
import { AddTipoAlojamiento } from './pages/AddTipoAlojamiento';
import { Footer } from './components/Footer';
import { Nosotros } from './pages/Nosotros';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Inicio/>}></Route>
          <Route path='/nosotros' element={<Nosotros></Nosotros>}></Route>
          {/* Acá hay que agregar las otras rutas */}
          <Route path='/tipoAlojamiento' element={<TipoAlojamiento/>}></Route>
          <Route path='/tipoAlojamiento/agregar' element={<AddTipoAlojamiento/>}></Route>
          <Route path='/tipoAlojamiento/:id/edit' element={<EditTipoAlojamiento/>}></Route>
        </Routes>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
