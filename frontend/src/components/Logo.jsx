import './logo.css';

export const Logo = ({children}) => {
    return (
        <div className="logo">
            <img src="./LogoSinFondo.png" className="logo" alt="logo"></img>
            <h3>{children}</h3>
        </div>
    );
}