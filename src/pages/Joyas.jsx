import ProductosFiltrados from '../components/ProductosFiltrados';
import TarjetaDetalle from './../components/TarjetaDetalle';
import {useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';


//componente de envoltorio para un producto individual
const TarjetaJoyasWrapper = ({producto}) => {
    //hooks necesarios 
    const [cantidad] = useState(1);
    const [agregado, setAgregado] = useState(false);
    const { agregarAlCarrito } = useContext(CarritoContext);
   

    //handlers de interaccion
    const handleAgregarAlCarrito = () => {
        for (let i = 0; i < cantidad; i++) {
            agregarAlCarrito(producto);
        }
        setAgregado(true);
        setTimeout(() => 
            setAgregado(false), 2000);//mensaje de agregado por 2 segundos
    };

    return (
        <TarjetaDetalle 
            producto={producto}
            agregado={agregado}
            onAgregar={handleAgregarAlCarrito}
            mostrarVerCarrito={false}
        />
    );
};


const Joyas = () => {
    // 💡 Usamos el hook, pasando la categoría deseada: "Joyas"
    const { productos, cargando, error } = ProductosFiltrados("jewelery");

    if (cargando) return <h2 className="text-center my-5">...Cargando Joyas...</h2>;
    if (error) return <p className="alert alert-danger my-5">{error}</p>;

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Joyas</h1>

            {/* Mapeamos el listado filtrado */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productos.map((producto) => (
                    <div key={producto.id} className="col">
                        {/* Usamos TarjetaDetalle para el renderizado */}
                        <TarjetaJoyasWrapper 
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Joyas;