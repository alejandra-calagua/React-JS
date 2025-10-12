import React, { useMemo } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Icono para eliminar, si usas React Icons


const Carrito = ({ productosEnCarrito, productosEliminados }) => {
  
  
  const total = productosEnCarrito.reduce((suma, producto) => suma + producto.price, 0);
  

  return (
    <div id="seccion-carrito" className="container my-5">
      <h2 className="text-center mb-4 border-bottom pb-2">
        🛒 Tu Carrito de Compras ({productosEnCarrito.length} {productosEnCarrito.length === 1 ? 'artículo' : 'artículos'})
      </h2>

      {productosEnCarrito.length === 0 ? (
        // Mensaje si el carrito está vacío
        <div className="alert alert-info text-center" role="alert">
          Tu carrito está vacío. ¡Añade algunos productos!
        </div>
      ) : (
        // Contenido del carrito
        <div className="row">
          {/* Columna de Productos (Ocupa 8 o 7/12 del ancho) */}
          <div className="col-lg-8">
            <div className="list-group">
              {productosEnCarrito.map((producto, indice) => (
                <div 
                  key={indice} 
                  className="list-group-item d-flex align-items-center justify-content-between p-3 mb-2 shadow-sm rounded-3"
                >
                  <div className="d-flex align-items-center">
                    {/* Imagen del Producto */}
                    <img 
                      src={producto.image} 
                      alt={producto.title} 
                      className="img-thumbnail me-3"
                      style={{ height: '80px', width: '80px', objectFit: 'cover' }} 
                    />
                    
                    {/* Detalles del Producto */}
                    <div>
                      <h5 className="mb-1 fw-bold">{producto.title}</h5>
                      <p className="mb-0 text-muted">Precio: ${producto.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Botón Eliminar */}
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={() => productosEliminados(indice)}
                  >
                    <FaTrashAlt className="me-1" /> Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Columna de Resumen (Ocupa 4 o 5/12 del ancho) */}
          <div className="col-lg-4">
            <div className="card shadow-lg sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h3 className="card-title mb-3 border-bottom pb-2">Resumen de Compra</h3>
                <div className="d-flex justify-content-between fs-5 fw-bold text-success">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span> 
                  {/* toFixed(2) para mostrar dos decimales */}
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;