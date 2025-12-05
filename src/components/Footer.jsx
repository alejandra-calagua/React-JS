import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'; 
const Footer = () => {
  
  const anioActual = new Date().getFullYear();
  // 2. Crear estado para controlar la visibilidad del modal
  const [show, setShow] = useState(false); 

  // Funciones para manejar la apertura y el cierre del modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <footer className="bg-dark text-white py-3 text-center" >
      {/* Seccion de enlaces */}
      <ul className="list-unstyled d-flex justify-content-center mb-2">
        <li className="mx-2">
          <Link to="/contacto" className= "text-white text-decoration-none">Quienes somos... </Link>
        </li>
        <li className="mx-2">
          <a
            href="#" 
            onClick={handleShow} // <- Al hacer click, se llama a la función
            className="text-white text-decoration-none" 
            style={{ cursor: 'pointer' }} 
          >
            Política de Privacidad
          </a>
        </li>
      </ul>
      {/* Seccion de Copyright */}
      <p className="mb-0">
         © {anioActual} Alejandra Calagua. Todos los derechos reservados®.
      </p>

      {/* Modal de Política de Privacidad */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Política de Privacidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           Este es un proyecto React de ejemplo. La política de privacidad aquí presentada es ficticia y 
           se utiliza únicamente con fines ilustrativos. No se recopila ni se almacena ninguna información 
           personal real a través de este sitio.
          </p>
          <p>
            *1. Recopilación de Datos:* No recopilamos datos personales de los usuarios que visitan este sitio.
          </p>
          <p>
            *2. Uso de Cookies:* Este sitio no utiliza cookies para rastrear la actividad del usuario.
          </p>
          <p>
            *3. Este sitio solo es un ejemplo educativo y no debe ser utilizado como una política de privacidad real.*
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* Botón para cerrar el modal */}
          <button className="btn btn-secondary" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}

export default Footer;