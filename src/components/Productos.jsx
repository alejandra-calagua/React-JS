import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tarjeta from './Tarjeta';

const Productos = ({ agregarProducto }) => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const URL = 'https://fakestoreapi.com/products';

    useEffect(() => {
        fetch(URL)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                setError('Error cuando se cargan productos');
                setCargando(false);
            })
    }, []);

    if (cargando) return '...Cargando productos...';
    if (error) return error;

    return (

        <div className="container my-4"> {/* Contenedor principal con margen vertical */}
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>

            {/* Usamos la Grilla de Bootstrap:
        - row: Define una fila.
        - g-4: Define un "gutter" (espaciado) de 4 entre las columnas.
      */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productos.map((producto) => (

                    < div key={producto.id} className="col" >
                        <Tarjeta
                            producto={producto}
                            agregarProducto={agregarProducto}
                        />
                    </div>
                ))}
            </div>
        </div >
    );
};
export default Productos;