import Tarjeta from './Tarjeta';
import { useProductosContext } from '../context/ProductosContext';
import { useBusqueda } from '../context/BusquedaContext';
import { useState, useEffect } from 'react';


const Productos = ({ agregarProducto }) => {
    const { productos, cargando, error } = useProductosContext();
    const { busqueda } = useBusqueda();//*


    if (cargando) return '...Cargando productos...';
    if (error) return error;

//*filtrado de productos según búsqueda
const productosFiltrados = productos.filter((producto) => //*
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

//* paginado 
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);

//reseteo de página al cambiar la búsqueda
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

//* Función para cambiar de página
const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
const cambiarPagina = (numeroPagina) => 
    setPaginaActual(numeroPagina);



    return (

        <div className="container my-4"> {/* Contenedor principal con margen vertical */}
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>


            {/*Lista filtrada de productos */}            

            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productosPaginados.map((producto) => (

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
            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                key={index + 1}
                className={`btn btn-sm mx-1 ${paginaActual === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => cambiarPagina(index + 1)}
                >
                {index + 1}
                </button>
            ))}
            </div>
        </div>
        
    );
};



export default Productos;