import Tarjeta from './Tarjeta';
import { useProductosContext } from '../context/ProductosContext';
import { useBusqueda } from '../context/BusquedaContext';//*


const Productos = ({ agregarProducto }) => {
    const { productos, cargando, error } = useProductosContext();
    const { busqueda } = useBusqueda();//*


    if (cargando) return '...Cargando productos...';
    if (error) return error;

    const productosFiltrados = productos.filter((producto) => //*
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (

        <div className="container my-4"> {/* Contenedor principal con margen vertical */}
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>


            {/*Lista filtrada de productos */}
            

            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productosFiltrados.map((producto) => (

                    < div key={producto.id} className="col" >
                        <Tarjeta
                            producto={producto}
                            agregarProducto={agregarProducto}
                        />
                    </div>
                ))}
                </div> 
            ) : (
                <div className="d-flex justify-content-center w-100 mt-5">
                <p class="alert alert-warning">Disculpe, no hay productos que coincidan con la búsqueda.</p>
                </div>
            )}
        </div>
        
    );
};



export default Productos;