import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero"
import { useEffect, useState } from "react";
import './alojamientoDetalle.css';
import { TypePill } from "../components/Cards/CardsAlojamientos/TypePill";
import { StatusPill } from "../components/Cards/CardsAlojamientos/StatusPill";
import { Button } from "../components/Button/Button";
import { getAlojamiento, putAlojamiento } from "../services/alojamientoService";
import { getAllTiposAlojamientos } from "../services/tipoAlojamientoService";
import { getAllServicios } from "../services/servicioService";
import { getAlojamientoServicios } from "../services/alojamientoServicioService";
import { getAllImagenes } from "../services/imagenService";
import { Modal } from "../components/Modal";

export const AlojamientoDetalle = () => {

    const {id} = useParams();
    const [data, setData] = useState({});

    const obtenerDatos = async (idAloj) => {
        try {
            const jsonData = await getAlojamiento(idAloj);
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDatos(id);
    }, [id]);

    const [dataImagenes, setDataImagenes] = useState([]);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const jsonData = await getAllImagenes();
                setDataImagenes(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerImagenes();
    }, []);

    const [dataTipo, setDataTipo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await getAllTiposAlojamientos();
                setDataTipo(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [dataServicios, setDataServicios] = useState([]);

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const jsonData = await getAllServicios();
                setDataServicios(jsonData);
            } catch (err) {
                console.error(err);
            }
        };
        obtenerServicios();
    }, []);

    const [dataServiciosAloj, setDataServiciosAloj] = useState([]);

    useEffect(() => {
        const obtenerDatosServAloj = async () => {
            try {
                const jsonData = await getAlojamientoServicios(id);
                setDataServiciosAloj(jsonData);
                console.log(jsonData);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerDatosServAloj();
    }, [id]);


    const obtenerUrl = (imagenes) => {
        const imagenEncontrada = imagenes.find((imagen) =>
            imagen.idAlojamiento === data.idAlojamiento);
        if (imagenEncontrada) {
            return imagenEncontrada.RutaArchivo;
        } else {
            return 'https://cdn.icon-icons.com/icons2/1744/PNG/512/3643769-building-home-house-main-menu-start_113416.png'
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [modalType, setModalType] = useState('');

    const reservar = () => {
        setModalMsg('¿Reservar alojamiento?');
        setModalType('success')
        setShowModal(true);
    }

    const confirmarReserva = async () => {
        const json = {...data, Estado:'Reservado' };

        try {
            await putAlojamiento(id, json);
            setShowModal(false);
            obtenerDatos(id);
        } catch (error) {
            setModalMsg('No se pudo reservar.');
            setModalType('error');
            setShowModal(true);
        }
    }

    return(
        <>
            <Hero title={data.Titulo} urlImage={obtenerUrl(dataImagenes)} heigth={'30vh'} position={'center'}></Hero>
            <main className="main-detalle">
                <section className="detalle-section-carrusel">
                    <h3>Galería de imágenes</h3>
                    <div className="detalle-carrusel">
                        {dataImagenes.map((img) => (
                            img.idAlojamiento === data.idAlojamiento && <img key={img.idImagen} src={img.RutaArchivo} alt="" />
                        ))}
                    </div>
                </section>
                <section className="detalle-section">
                    <div className="detalle-pills">
                        <TypePill item={data} dataTipos={dataTipo}></TypePill>
                        <StatusPill data={data} on></StatusPill>
                    </div>
                    <p className='location'>Ubicación</p>
                    <h2>{data.Titulo}</h2>
                    <p>{data.Descripcion}</p>
                    <div className="detalle-servicios">
                        <p>Este alojamiento ofrece: </p>
                        <div className="lista-servicios">
                            <span className="servicios-item"><i className="fa-solid fa-bed"></i> {data.CantidadDormitorios}</span>
                            <span className="servicios-item"><i className="fa-solid fa-toilet"></i> {data.CantidadBanios}</span>
                            {dataServiciosAloj.map((item) => {
                                const servicio = dataServicios.find((servicio) => servicio.idServicio === item.idServicio);
                                return (
                                    <span className="servicios-item" key={item.idAlojamientoServicio}>
                                        {servicio ? servicio.Nombre : 'Servicio no encontrado'}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="summary">
                        <details>
                            <summary>Más detalles</summary>
                            <p>Horario de check in desde las 16:00 hs</p>
                            <p>Horario de check out hasta las 11:00 hs</p>
                            <p>Se permiten mascotas.</p>
                        </details>
                    </div>
                    <div className="detalle-anfitrion">
                        <div className="anfitrion-avatar"></div>
                        <div className="anfitrion-contenido">
                            <span>Anfitrión</span>
                            <h5>Leo Messi</h5>
                            <p>12 años de experiencia como anfitrion. Tiene 14 alojamientos publicados. Sus huéspedes lo recomiendan</p>
                        </div>
                    </div>
                    <div className="detalle-mapa">
                        <h3>Ubicación en el mapa</h3>
                    </div>
                </section>
            </main>
            <div className="detalle-footer">
                <div>
                    <i>Precio por día:</i>
                    <p>{new Intl.NumberFormat("es-AR",  { style: 'currency', currency: 'ARS' }).format(data.PrecioPorDia)}</p>
                </div>
                <div>
                    <Button icon='add' onClick={reservar} extrarounded shadowed color='primary' disabled={data.Estado === 'Reservado'}>Reservar</Button>
                </div>
            </div>
            <Modal action={modalType} show={showModal} onAccept={() => confirmarReserva()} onClose={() => setShowModal(false)}>{modalMsg}</Modal>
        </>
    )
}