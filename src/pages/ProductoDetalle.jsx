import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TarjetaDetalle from "../components/TarjetaDetalle";


const ProductoDetalle = () => {
  
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(`https://691e61e4bb52a1db22bdbccb.mockapi.io/react-v1/productos/${id}`);
        if (!respuesta.ok) {
          console.log("Error al obtener el producto:", respuesta.status);
          setProducto(null);
          return;
        }
        const dato = await respuesta.json();
        setProducto(dato);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id]);
  
  if (cargando) return <p>Cargando ......</p>;
  if(!producto)
    return <p>Cargando ......</p>
  
  return(
    <>
    <div className="container">
        <div className="row justify-content-center ">
            <div className="col-12 col md-8"> 
                <TarjetaDetalle producto={producto}/>
            </div>
        </div>
    </div>
      
    </>
    
  );
}

export default ProductoDetalle;