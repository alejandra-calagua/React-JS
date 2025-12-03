import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import TarjetaDetalle from "../components/TarjetaDetalle";


const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, cargando, error } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [cantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const producto = productos.find(p => p.id === id); // Buscar el producto en el contexto


  //handlers de interaccion
  const handleAgregarAlCarrito = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    setAgregado(true);
    setTimeout(() =>
      setAgregado(false), 2000);//mensaje de agregado por 2 segundos
  };

  if (cargando) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando producto...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar el producto</h2>
          <p className="text-gray-600 mb-6">Se ha producido un error. Por favor, intenta nuevamente más tarde.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black-text text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }
  if (!producto) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que estás buscando no existe o ha sido eliminado.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black-text text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TarjetaDetalle
        producto={producto}
        agregado={agregado}
        onAgregar={handleAgregarAlCarrito}
        onVerCarrito={() => navigate('/carrito')}
      />
    </div>
  );
}

export default ProductoDetalle; 