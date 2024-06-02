import './cards.css';

export const Cards = () => {

    const productos = [
        {idAlojamiento: 0, titulo: "Mar del Plata", precio: 200000, tipoAlojamiento: "Hotel", urlImagen: "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg", cantBanio: 1, cantDor: 2},
        {idAlojamiento: 1, titulo: "Bariloche", precio: 1200000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 2, cantDor: 3},
        {idAlojamiento: 2, titulo: "La matanza", precio: 180000, tipoAlojamiento: "Casa", urlImagen: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg", cantBanio: 2, cantDor: 4},
        {idAlojamiento: 3, titulo: "Palermo", precio: 250000, tipoAlojamiento: "Departamento", urlImagen: "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg", cantBanio: 3, cantDor: 6},
        {idAlojamiento: 4, titulo: "Chubut", precio: 90000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg", cantBanio: 1, cantDor: 1},
        {idAlojamiento: 5, titulo: "Cataratas", precio: 110000, tipoAlojamiento: "Cabaña", urlImagen: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg", cantBanio: 1, cantDor: 1},
    ];

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const listJSX = productos.map(producto =>
    <div key={producto.idAlojamiento} className='card-item'>
        <div className='card-header'>
            <div className="card-imagen" style={{backgroundImage: `url("${producto.urlImagen}")`}}>
                <div className='card-medio' style={{backgroundColor:getRandomColor()}}>
                    {capitalize(producto.tipoAlojamiento)}
                </div>
            </div>
        </div>
        <div className='card-content'>
            <h3>{producto.titulo}</h3>
        </div>
        <div className='card-footer'>
            <p>Precio: {producto.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
            <p>Disponible</p>
        </div>
        <hr></hr>
        <div className="card-footer">
            <p>Cantidad de dormitorios: {producto.cantDor}</p>
            <p>Cantidad de baños: {producto.cantBanio}</p>
        </div>
    </div>
    )

    if (listJSX.length > 0){
        return <div className='flex-container'>
            {listJSX}
        </div>
    } else {
        return <div className='flex-container'>
            No hay datos.
        </div>
    }
}