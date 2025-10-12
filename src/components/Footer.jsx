const Footer = () => {
  
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3 text-center">
      {/* Seccion de enlaces */}
      <ul className= "list-unstyled mb-2 d-flex justify-content-center ">
        <li className="mx-2">
          {/* Al hacer clic, lleva a la seccion Contacto */}
          <a href="/contacto" className= "text-white text-decoration-none">Quienes somos... </a>
        </li>
        <li className="mx-2">
          <a href="#" className= "text-white text-decoration-none" >Política de Privacidad</a>
        </li>
      </ul>
      {/* Seccion de Copyright */}
      <p className="mb-0" >
        © {anioActual} Alejandra Calagua. Todos los derechos reservados®.
      </p>
    </footer>
  );
}

export default Footer;