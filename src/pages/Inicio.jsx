import { useState } from 'react';
import Productos from '../components/Productos';
import Carrito from '../components/Carrito';

const Inicio = () => {
  const [carrito, setCarrito] = useState([]);
  // Usamos el spread operator (...) para copiar el array existente 
  // y añadir el nuevo producto.
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);   
  };
  // Usamos filter() para crear un nuevo array que excluye el elemento con el índice dado.
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  };

  return(
    <>
      <Productos agregarProducto={agregarAlCarrito}/>
      <hr/>
      <Carrito 
        productosEnCarrito={carrito}
        productosEliminados={eliminarDelCarrito}
      />
    </>
  );
}

export default Inicio;