import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button/Button";

export const EditAlojamientoForm = () => {
    
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

    const {id} = useParams();
    const [data, setData] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}alojamiento/getAlojamiento/${id}`);
                const jsonData = await response.json();
                setData(jsonData);
                setIdTipoAlojamiento(data.idTipoAlojamiento);
                setEstado(data.Estado);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, data.idTipoAlojamiento, data.Estado]);

    const actualizarDatos = async (e) => {
        // Este método previene que se recargue la página
        e.preventDefault();
        
        // Construimos el objeto con los datos, despues se transforma a json en el body
        const formE = e.target;
        const formData = new FormData(formE);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        // const formJson = {
        //     Titulo : Titulo,
        //     Descripcion : Descripcion,
        //     idTipoAlojamiento: idTipoAlojamiento,
        //     Latitud: Latitud,
        //     Longitud: Longitud,
        //     PrecioPorDia: PrecioPorDia,
        //     CantidadDormitorios: CantidadDormitorios,
        //     CantidadBanios: CantidadBanios,
        //     Estado: Estado,
        // };

        // Intentamos la conexion a la api
        try {
            const response = await fetch(`${BASE_URL}alojamiento/putAlojamiento/${id}`,{
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(formJson)
            });
            if (response.ok) {
                setModalMsg('Editado con éxito.');
                setModalType('success')
                setShowModal(true);
            } else {
                setModalMsg('Se produjo un error.');
                setModalType('error');
                setShowModal(true);
            }
        } catch (error) {
            setModalMsg('Se produjo un error.');
            setModalType('error');
            setShowModal(true);
        }
    };

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
                <form ref={form} onSubmit={actualizarDatos}  className="flex-container-center">
                    <div className="form-field">
                        <label htmlFor="titulo" className="form-label">Titulo:</label>
                        <input required type="text" id="titulo" name="titulo" defaultValue={data.Titulo} onChange={e => setTitulo(e.target.value)} className="form-input" placeholder="Título en no más de 4 palabras" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                        <input required type="text" id="descripcion" name="descripcion" defaultValue={data.Descripcion} onChange={e => setDescripcion(e.target.value)} className="form-input" placeholder="Descripción detallada del alojamiento" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="idTipoAlojamiento" className="form-label">Tipo de Alojamiento:</label>
                        <select required id="idTipoAlojamiento" name="idTipoAlojamiento" value={idTipoAlojamiento} onChange={e => setIdTipoAlojamiento(e.target.value)} className="form-input" placeholder='--SELECCIONE--'>
                            <option disabled>--SELECCIONE--</option>
                            {dataTipos.map((item) => (
                                <option key={item.idTipoAlojamiento} value={item.idTipoAlojamiento}>{item.Descripcion.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label htmlFor="latitud" className="form-label">Latitud:</label>
                        <input required type="number" min={-90} max={90} step='any' id="latitud" name="latitud" defaultValue={data.Latitud} onChange={e => setLatitud(e.target.value)} className="form-input" placeholder="Número entre -90 y 90" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="longitud" className="form-label">Longitud:</label>
                        <input required type="number" min='-180' max='180' step='any' id="longitud" name="longitud" defaultValue={data.Longitud} onChange={e => setLongitud(e.target.value)} className="form-input" placeholder="Número entre -180 y 180" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="precioPorDia" className="form-label">Precio por día:</label>
                        <input required type="number" min={1} step='any' id="precioPorDia" name="precioPorDia" defaultValue={data.PrecioPorDia} onChange={e => setPrecioPorDia(e.target.value)} className="form-input" placeholder="Número decimal" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadDormitorios" className="form-label">Cantidad de dormitorios:</label>
                        <input required type="number" min={0} id="cantidadDormitorios" name="cantidadDormitorios" defaultValue={data.CantidadDormitorios} onChange={e => setCantidadDormitorios(e.target.value)} className="form-input" placeholder="Número entero" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cantidadBanios" className="form-label">Cantidad de baños:</label>
                        <input required type="number" min={0} id="cantidadBanios" name="cantidadBanios" defaultValue={data.CantidadBanios} onChange={e => setCantidadBanios(e.target.value)} className="form-input" placeholder="Número entero" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="estado" className="form-label">Estado:</label>
                        <select required id="estado" name="estado" value={Estado} onChange={e => setEstado(e.target.value)} className="form-input">
                            <option value="Disponible">DISPONIBLE</option>
                            <option value="Reservado">RESERVADO</option>
                        </select>
                    </div>
                    <div className="columna-botones">
                        <Button type='submit' color='warning' icon='edit' grow shadowed rounded>Editar</Button>
                        <Button onClick={volver} color='danger' icon='cancel' shadowed rounded>Cancelar</Button>
                    </div>
                    <Modal action={modalType} show={showModal} onClose={() => volver()}>{modalMsg}</Modal>
                </form>
            </section>
        </>
    );
}