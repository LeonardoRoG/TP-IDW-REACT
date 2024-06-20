export const TypePill = ({item, dataTipos}) => {

    /**
    * Función para generar colores claros aleatorios
    * @returns código de color
    */
    const generateRandomColor = () => {
        // Genera un color con luminosidad alta (entre 70% y 100%)
        const luminosity = Math.floor(Math.random() * 31) + 70;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const hexColor = `#${randomColor}`;
        
        // Convierte el color hexadecimal a RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Calcula la luminosidad del color
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Si la luminosidad es alta, devuelve el color; de lo contrario, genera otro
        return luminance >= luminosity / 100 ? hexColor : generateRandomColor();
    };

    return(
        <div className='type-pill' style={{backgroundColor:generateRandomColor()}}>
            <p>{dataTipos.map((tipo) => (
                item.idTipoAlojamiento === tipo.idTipoAlojamiento && tipo.Descripcion
            ))}
            </p>
        </div>
    )
}