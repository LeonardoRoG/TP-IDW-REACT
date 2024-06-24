import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";
import { addAlojamiento } from "../services/alojamientoService";
import { getAllTiposAlojamientos } from "../services/tipoAlojamientoService";

export const AddAlojamientoForm = () => {

    const [Titulo, setTitulo] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [idTipoAlojamiento, setIdTipoAlojamiento] = useState(0);
    const [Latitud, setLatitud] = useState(0);
    const [Longitud, setLongitud] = useState(0);
    const [PrecioPorDia, setPrecioPorDia] = useState(0);
    const [CantidadDormitorios, setCantidadDormitorios] = useState(0);
    const [CantidadBanios, setCantidadBanios] = useState(0);
    const [Estado, setEstado] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');
    const form = useRef();

    const agregarAlojamiento = async (e) => {
        e.preventDefault();

        const formJson = {
            Titulo : Titulo,
            Descripcion : Descripcion,
            idTipoAlojamiento: idTipoAlojamiento,
            Latitud: Latitud,
            Longitud: Longitud,
            PrecioPorDia: PrecioPorDia,
            CantidadDormitorios: CantidadDormitorios,
            CantidadBanios: CantidadBanios,
            Estado: Estado,
        };

        try {
            const response = await addAlojamiento(formJson);
            setModalMsg(response.message);
            setModalType('success')
            setShowModal(true);
            form.current.reset();
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

    const [dataTipos, setDataTipos] = useState([]);

    useEffect(() => {
        const obtenerTipos = async () => {
            try{
                const jsonData = await getAllTiposAlojamientos();
                setDataTipos(jsonData);
            } catch(err){
                console.error(err);
            }
        };
        obtenerTipos();
    },[]);

    const navigate = useNavigate();

    const volver = () => {
        navigate('/admin/alojamiento');
    }

    return (
        <>
            <div className="flex-left">
                <h3>Ingrese los datos del nuevo alojamiento</h3>
            </div>
            <section className="section-flex">
                <form ref={form} onSubmit={agregarAlojamiento} className="flex-container-center">
                    <div className="form-field">
                        <label htmlFor="titulo" className="form-label">Titulo:</label>
                        <input required type="text" id="titulo" name="titulo" onChange={e => setTitulo(e.target.value)} className="form-input" placeholder="Título en no más de 4 palabras" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                        <textarea required type="text" id="descripcion" name="descripcion" rows="4" onChange={e => setDescripcion(e.target.value)} className="form-input textarea" placeholder="Descripción detallada del alojamiento"/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="idTipoAlojamiento" className="form-label">Tipo de Alojamiento:</label>
                        <select required id="idTpoAlojamiento" name="idTipoAlojamiento" onChange={e => setIdTipoAlojamiento(e.target.value)} defaultValue={'--SELECCIONE--'} className="form-input" placeholder='--SELECCIONE--'>
                            <option disabled>--SELECCIONE--</option>
                            {dataTipos.map((item) => (
                                <option key={item.idTipoAlojamiento} value={item.idTipoAlojamiento}>{item.Descripcion.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="latitud" className="form-label">Latitud:</label>
                        <input required type="number" min={-90} max={90} step='any' id="latitud" name="latitud" onChange={e => setLatitud(e.target.value)} className="form-input" placeholder="Número entre -90 y 90" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="longitud" className="form-label">Longitud:</label>
                        <input required type="number" min='-180' max='180' step='any' id="longitud" name="longitud" onChange={e => setLongitud(e.target.value)} className="form-input" placeholder="Número entre -180 y 180" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="precioPorDia" className="form-label">Precio por día:</label>
                        <input required type="number" min={1} step='any' id="precioPorDia" name="precioPorDia" onChange={e => setPrecioPorDia(e.target.value)} className="form-input" placeholder="Número decimal" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadDormitorios" className="form-label">Cantidad de dormitorios:</label>
                        <input required type="number" min={0} id="cantidadDormitorios" name="cantidadDormitorios" onChange={e => setCantidadDormitorios(e.target.value)} className="form-input" placeholder="Número entero" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadBanios" className="form-label">Cantidad de baños:</label>
                        <input required type="number" min={0} id="cantidadBanios" name="cantidadBanios" onChange={e => setCantidadBanios(e.target.value)} className="form-input" placeholder="Número entero" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="estado" className="form-label">Estado:</label>
                        <select required id="estado" name="estado" onChange={e => setEstado(e.target.value)} defaultValue={'--SELECCIONE--'} className="form-input">
                            <option disabled>--SELECCIONE--</option>
                            <option value="Disponible">DISPONIBLE</option>
                            <option value="Reservado">RESERVADO</option>
                        </select>
                    </div>
                    <div className="columna-botones">
                        <Button type='submit' color='primary' grow shadowed rounded icon='add'>Agregar</Button>
                        <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                    </div>
                    <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
                </form>
            </section>
        </>
    );

}