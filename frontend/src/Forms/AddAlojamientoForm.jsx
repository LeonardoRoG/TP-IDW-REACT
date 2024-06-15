import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

export const AddAlojamientoForm = () => {
    
    const BASE_URL = 'http://localhost:3001/';

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
        // const formE = e.target;
        // const formData = new FormData(formE);

        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

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
            const response = await fetch(BASE_URL + 'alojamiento/createAlojamiento',{
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(formJson)
            });
            const jsonData = await response.json();
            if (response.ok) {
                console.log(jsonData);
                setModalMsg('Agregado con éxito.');
                setModalType('success')
                setShowModal(true);
                form.current.reset();
            } else {
                console.log('error');
                setModalMsg('Se produjo un error.');
                setModalType('error');
                setShowModal(true);
            }
        } catch (error) {
            console.log('error');
            setModalMsg('Se produjo un error.');
            setModalType('error');
            console.error(error);
        }
    };

    const [dataTipos, setDataTipos] = useState([]);

    useEffect(() => {
        const obtenerTipos = async () => {
            try{
                const response = await fetch(BASE_URL+'tiposAlojamiento/getTiposAlojamiento');
                const jsonData = await response.json();
                setDataTipos(jsonData);
            } catch(err){
                console.error(err);
            }
        };
        obtenerTipos();
    },[]);

    const navigate = useNavigate();

    const volver = () => {
        navigate(-1);
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
                        <input required type="text" id="descripcion" name="descripcion" onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder="Descripción detallada del alojamiento" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="idTipoAlojamiento" className="form-label">Tipo de Alojamiento:</label>
                        <select required id="idTpoAlojamiento" name="idTipoAlojamiento" onChange={e => setIdTipoAlojamiento(e.target.value)} className="form-input" placeholder='--SELECCIONE--'>
                            <option selected disabled>--SELECCIONE--</option>
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
                        <select required id="estado" name="estado" onChange={e => setEstado(e.target.value)} className="form-input">
                            <option selected disabled>--SELECCIONE--</option>
                            <option value="Disponible">DISPONIBLE</option>
                            <option value="Reservado">RESERVADO</option>
                        </select>
                    </div>
                    <div className="columna-botones">
                        <button type='submit' className='boton-primario grow'><i className="fa-solid fa-plus ff-icon"></i>Agregar</button>
                        <Link onClick={volver} className="boton-delete"><i className="fa-solid fa-xmark ff-icon"></i> Cancelar</Link>
                    </div>
                    <Modal action={modalType} show={showModal} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
                </form>
            </section>
        </>
    );

}