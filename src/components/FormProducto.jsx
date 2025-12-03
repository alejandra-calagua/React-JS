import { useState } from "react";
import { useProductosContext } from "../context/ProductosContext";
import styles from "./FormProducto.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";


const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  const DEFAULT_IMAGE_URL = "https://elements-resized.envatousercontent.com/elements-cover-images/8105a84f-73a2-4940-8d7d-b7e556c426cb?w=433&cf_fit=scale-down&q=85&format=auto&s=18f446da29483e2fd0f3cbe2fba6a98fcdc3b3e99d018faa0b299e4e7191834d"

  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto, categoriasUnicas } = useProductosContext();
  //icono "cerrar"
  const iconoCerrar = () => <IoMdCloseCircleOutline size={28} />;

  //manejo de errores
  const [errores, setErrores] = useState({});

  // Manejar cambios en el campo de categorias(nombres en español)
  const MAPEO_CATEGORIAS = {
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
    "electronics": "Electrónica",
    "jewelery": "Joyería",
};

const obtenerNombreCategoria = (categoriaApi) => {
    return MAPEO_CATEGORIAS[categoriaApi] || 
           categoriaApi.charAt(0).toUpperCase() + categoriaApi.slice(1);
};

//validacion de formulario
const validarFormulario = () => {
    const nuevosErrores = {}; 
    
    if (!producto.title || producto.title.trim() === "") {
      nuevosErrores.title = "El nombre del producto es obligatorio.";
    }
    if (!producto.price || isNaN(producto.price) || Number(producto.price) <= 0) {
      nuevosErrores.price = "El precio debe ser un número válido mayor o igual a 0.";
    }
    if (!producto.category || producto.category.trim() === "") {
      nuevosErrores.category = "La categoría es obligatoria.";
    }
    if (!producto.description || producto.description.trim() === ""|| producto.description.length < 10) {
      nuevosErrores.description = "La descripción es obligatoria y debe tener al menos 10 caracteres.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar cambios en los campos del formulario
  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
    if (errores[name]) {
      const { [name]: removedE, ...restOfErrors } = errores;
      setErrores(restOfErrors);
    }
  };

  // Manejar el envío del formulario
  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    if (validarFormulario()) {
      const productoConPrecio={
      ...producto,
      image: !producto.image || producto.image.trim() === "" ? DEFAULT_IMAGE_URL : producto.image,
      price: Number(producto.price)
    };
    if (modo === "agregar") {
      await agregarProducto(productoConPrecio);
    } else {
      await editarProducto(productoConPrecio);
    }
    setErrores({});
    onCerrar();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modalContainer}>
        {/* Contenido del Modal */}
        <div className={styles.modalContent}>
          {/* Encabezado del Modal */}
          <div className={styles.modalHeader}>
            <h3 className={styles.modalHeaderTitle}>
              {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
            </h3>
            <button
              type="button"
              onClick={onCerrar}
              className={styles.closeButton}
            >
              {iconoCerrar()}
            </button>
          </div>
          {/* Cuerpo del Modal */}
          <form onSubmit={manejarSubmit}>
            <div className={styles.formGrid}>
              {/* Campo Nombre */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="title"
                  id="nombre"
                  className={styles.formInputBase}
                  placeholder="Ingrese el nombre del producto"
                  value={producto.title || ""}
                  onChange={manejarChange}
                  
                />
                {errores.title && <p style={{ color: "red" }}>{errores.title}</p>}
              </div>
              {/* campo categoria */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Categoría
                </label>
                <select
                  name="category"
                  id="categoria"
                  className={styles.formInputBase}
                  value={producto.category || ""}
                  onChange={manejarChange}
                  
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {categoriasUnicas.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {obtenerNombreCategoria(categoria)} {/* Convierte a nombre en español */ }
                    </option>
                  ))}
                </select>
                {errores.category && <p style={{ color: "red" }}>{errores.category}</p>}
              </div>

              {/* Campo Precio */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`} >
                <label className={styles.formLabel}>
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  id="precio"
                  className={styles.formInputBase}
                  placeholder="$0.00"
                  value={producto.price || ""}
                  onChange={manejarChange}
                  
                  min="0"
                  step="any"
                />
                {errores.price && <p style={{ color: "red" }}>{errores.price}</p>}
              </div>
              
              {/* Campo URL de Imagen */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  URL de Imagen
                </label>
                <input
                  type="text"
                  name="image"
                  id="imagen"
                  className={styles.formInputBase}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={producto.image || ""}
                  onChange={manejarChange}
                />
              </div>
              {/* Campo Descripcion */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Descripción del Producto
                </label>
                <textarea
                  id="descripcion"
                  name="description"
                  rows="4"
                  className={styles.formInputBase}
                  placeholder="Escriba la descripción del producto aquí"
                  value={producto.description || ""}
                  onChange={manejarChange}
                  
                ></textarea>
                {errores.description && <p style={{ color: "red" }}>{errores.description}</p>}
              </div>
            </div>
            {/* Botones de Accion */}
            <div className={styles.modalActions}>
              {/* Boton Primario */}
              <button 
                type="submit" 
                className={`${styles.btnBase} ${styles.btnPrimary}`}
          >
            {modo === "agregar" ? <>Agregar</> : <>Actualizar</>}
          </button>
          {/* Boton Secundario o de cancelar */}
          <button
            type="button"
            onClick={onCerrar}
            className={`${styles.btnBase} ${styles.btnSecondary}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
}

export default FormProducto;