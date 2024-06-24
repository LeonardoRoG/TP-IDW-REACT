export const StatusPill = ({data, on}) => {

    return (
        <div className={`status ${data.Estado === 'Disponible' ? 'disponible' : 'reservado'} ${on? 'on' : ''}`}>
            <i className="fa-solid fa-circle-dot"></i>
            <span>{data.Estado}</span>
        </div>
    )
}