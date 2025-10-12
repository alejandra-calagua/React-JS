import React from 'react';
import ProductosFiltrados from './ProductosFiltrados'; 
import TarjetaDetalle from './TarjetaDetalle'; 

const Moda = () => {
    // 1. Obtener productos de HOMBRE
    const { 
        productos: productosHombre, 
        cargando: cargandoHombre, 
        error: errorHombre 
    } = ProductosFiltrados("men's clothing");

    // 2. Obtener productos de MUJER
    const { 
        productos: productosMujer, 
        cargando: cargandoMujer, 
        error: errorMujer 
    } = ProductosFiltrados("women's clothing");

    // Manejo de estados de carga y error (si cualquiera está cargando o tiene error)
    if (cargandoHombre || cargandoMujer) {
        return <h2 className="text-center my-5">...Cargando Moda...</h2>;
    }
    
    // Mostramos un error si cualquiera de las llamadas falló
    if (errorHombre || errorMujer) {
        return <p className="alert alert-danger my-5">Error al cargar productos de moda.</p>;
    }
    
    // Juntar ambos arrays en uno solo para mapear (opcional, pero útil para la grilla)
    const todosLosProductos = [...productosHombre, ...productosMujer];

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Catálogo de Moda </h1>

            {/* Grilla para todos los productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {/* Mapeamos el array combinado */}
                {todosLosProductos.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaDetalle 
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
            <h1 className="mb-4 text-center my-4">Catálogo de Hombre</h1>

            {/* Grilla para todos los productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {/* Mapeamos el array combinado */}
                {productosHombre.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaDetalle 
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
            <h1 className="mb-4 text-center my-4">Catálogo de Moda Mujer</h1>

            {/* Grilla para todos los productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {/* Mapeamos el array combinado */}
                {productosMujer.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaDetalle 
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Moda;