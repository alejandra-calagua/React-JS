import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { useProductosContext } from "../context/ProductosContext";
import styles from "./GestionProducto.module.css";
import { LuBadgePlus } from "react-icons/lu";//icono agregar
import { FaTrashAlt } from 'react-icons/fa'; // Icono para eliminar, React Icons
import {MdOutlineModeEditOutline} from 'react-icons/md'; // Icono para editar, React Icons

const GestionProductos = () => {
  // Cargando contexto de producto
  const { productos, cargando, error, eliminarProducto } = useProductosContext();
  // Estados 
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  //iconos
  const iconoAgregar = () => <LuBadgePlus size={28} />;
  const eliminarIcono = () => <FaTrashAlt className="me-1" color="pink"/>;
  const editarIcono = () => <MdOutlineModeEditOutline className="me-1" color="pink"/>;


  // Abrir formulario para AGREGAR
  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null); // Sin producto inicial
    setMostrarForm(true);
  };

  // Abrir formulario para EDITAR
  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto); // Pasar el producto a editar
    setMostrarForm(true);
  };

  // Cerrar formulario
  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  
  };
//estado de carga/error
  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.cabecera}>
           <h2>Lista de Productos</h2>
        {/* Botón para agregar producto */}
        <button
          onClick={abrirFormularioAgregar}
          className={styles.botonAgregar}
        >
          {iconoAgregar()}
          <p>Agregar Producto</p>
        </button>
        </div>
        {/* Lista de productos */}
        <div>
          {productos.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            <div style={{ display: "grid", gap: "5px"}}>
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className={styles.productoItem}
                >
                  <img className={styles.imagen} src={producto.image} alt={producto.title} />
                  <h3>{producto.title}</h3>
                  <p>Precio: ${producto.price}</p>
                  {/* Botones para editar y eliminar este producto */}
                  <button 
                    className={styles.boton} 
                    onClick={() => abrirFormularioEditar(producto)}
                  >
                   {editarIcono()}
                  </button>
                  <button 
                    className={styles.boton} 
                    onClick={() => eliminarProducto(producto.id)}
                  >
                   {eliminarIcono()}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal - Formulario condicional */}
        {mostrarForm && (
          <>
              {/* Pasar los props correctos según el modo */}
              <FormProducto
                productoInicial={productoSeleccionado || {}}
                modo={modoFormulario}
                onCerrar={cerrarFormulario}
              />
          </>
        )}
      </div>
    </div>
  );
};

export default GestionProductos;