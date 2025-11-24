import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import {FaUser, FaShoppingBag} from 'react-icons/fa'; 
//importamos iconos de react icons-fontawesome
import { TbShoppingCartHeart } from "react-icons/tb"; // Icono de carrito con corazón
import { RiUserHeartLine } from "react-icons/ri"
import { useBusqueda } from '../context/BusquedaContext';

const UserIcon = () => <FaUser size={20} />;
// const BagIcon = () => <FaShoppingBag size={20} />;
const CartHeart = () => <TbShoppingCartHeart size={28} color={'#ff00ff'} />;
const UserHeart = () => <RiUserHeartLine size={28} color={'#ff00ff'} />;

const Header = ({contadorEnCarrito = 0}) => {
  const { busqueda, setBusqueda } = useBusqueda(); //*
  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
      {/* Seccion Izquierda: Logo */}
      <div className ="fs-4 fw-bold me-3">
        <Link to= "/" className="text-white text-decoration-none">AndromedA's Palace</Link>
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className="d-none d-lg-block" >
        <NavBar/>
      </div>
         {/* Input de búsqueda */}
            <div className ="d-none d-lg-block ms-3" >
            <input
                type="text"
                placeholder="Buscar productos..." //*
                className="form-control mb-3"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={ {width: '250px'}
                }
            />
            </div>
      {/* Seccion Derecha: Iconos */}
      <div className="d-flex align-items-center">
        {/* Icono de Usuario */}
        <div className="me-3">
          <Link to="/login" className="text-white">
          <UserHeart />
          </Link>
        </div>
        {/* Icono de Carrito con Contador */}
        <div className="position-relative">
          {/* se realiza un salto a la parte inferior de la pagina en donde comienza carrito*/}
          <a href="#seccion-carrito" className="text-white">
          < CartHeart />
          {/* Renderiza el contador solo si es mayor que 0 */}
          {contadorEnCarrito > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {contadorEnCarrito}
            </span>
          )}
          </a>
          
        </div>
      </div>
    </header>   
  );
};

export default Header;
