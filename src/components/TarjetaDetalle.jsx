import { Link } from 'react-router-dom';

const TarjetaDetalle = ({ producto }) => {
  return (
    // Usa la clase 'card' de Bootstrap
    <div className="card h-100">
    
    <h2 className="card-title text-truncate text-center my-4">{producto.title}</h2>      

      {/* Imagen */}
      <img 
        src={producto.image} 
        className="card-img-top p-3" // p-3 para un pequeño padding alrededor de la imagen
        alt={producto.title} 
        style={{ height: '200px', objectFit: 'contain' }} // Estilos inline para asegurar el tamaño
      />

      {/* Cuerpo de la Tarjeta */}
      <div className="card-body d-flex flex-column">
        
        {/* Título y Precio */}
        <h5 className="card-title">Detalles del Producto Nro {producto.id}</h5>
        
        <p className="card-text fw-bold mt-auto">${producto.price}</p> 
        <p className="card-text mt-auto">{producto.description}</p>
        {/* mt-auto para empujar el precio al fondo, y fw-bold para destacarlo */}

       
      </div>
    </div>
  );
};

export default TarjetaDetalle;