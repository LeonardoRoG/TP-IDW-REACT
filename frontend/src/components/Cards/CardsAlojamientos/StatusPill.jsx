export const StatusPill = ({data}) => {
    return (
        <div className={`status ${data.Estado === 'Disponible' ? 'disponible' : 'reservado'}`}>
            <i className="fa-solid fa-circle-dot"></i>
            <span>{data.Estado}</span>
        </div>
    )
}