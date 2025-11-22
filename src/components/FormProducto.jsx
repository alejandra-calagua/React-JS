import { useState } from "react";
import { useProductosContext } from "../context/ProductosContext";
import styles from "./FormProducto.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";


const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {

  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto, categoriasUnicas } = useProductosContext();
  //icono "cerrar"
  const iconoCerrar = () => <IoMdCloseCircleOutline size={28} />;

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

  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    if (modo === "agregar") {
      await agregarProducto(producto);
    } else {
      await editarProducto(producto);
    }
    onCerrar();
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
                  required
                />
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
                  required
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {categoriasUnicas.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {obtenerNombreCategoria(categoria)} {/* Convierte a nombre en español */ }
                    </option>
                  ))}
                </select>
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
                  required
                  min="0"
                  step="any"
                />
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
                  required
                ></textarea>
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