import { useState, useEffect } from 'react';

const ProductosFiltrados = (category) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const URL = 'https://fakestoreapi.com/products';

    useEffect(() => {
        // Reiniciar estados al cambiar la categoría
        setCargando(true);
        setError(null);
        setProductos([]); 
        

        fetch(URL)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return respuesta.json();
            })
            .then((datos) => {
                // Filtrar los datos según la 'category' recibida
                const productosFiltrados = datos.filter(
                    (producto) => producto.category === category
                );
                
                setProductos(productosFiltrados);
                setCargando(false);
            })
            .catch((err) => {
                console.error(`Error al cargar la categoría ${category}:`, err);
                setError(`Error al cargar productos.`);
                setCargando(false);
            });
    }, [category]); // Se re-ejecuta si la categoría cambia

    // Devolvemos el estado necesario
    return { productos, cargando, error };
};

export default ProductosFiltrados;