import { createContext, useState } from "react";
// Crear el contexto
export const CarritoContext = createContext();
// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.findIndex(item => item.id === producto.id);
    
    if (productoExistente !== -1) {
      // Si el producto ya existe, aumentar la cantidad
      const nuevoCarrito = [...carrito];
      const cantidadActual = nuevoCarrito[productoExistente].cantidad || 1;
      nuevoCarrito[productoExistente] = {
        ...nuevoCarrito[productoExistente],
        cantidad: cantidadActual + 1
      };
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (indice, nuevaCantidad) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[indice] = { ...nuevoCarrito[indice], cantidad: nuevaCantidad };
    setCarrito(nuevoCarrito);
  };
  // Usamos filter() para crear un nuevo array que excluye el elemento
  // con el índice dado.
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};