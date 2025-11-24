import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag } from 'react-icons/fa';
//importamos iconos de react icons-fontawesome
import { TbShoppingCartHeart } from "react-icons/tb"; // Icono de carrito con corazón
import { RiUserHeartLine } from "react-icons/ri"
import { useBusqueda } from '../context/BusquedaContext';
import { useAuthContext } from '../context/AuthContext';
import { MdOutlineSettingsSuggest } from "react-icons/md";

const UserIcon = () => <FaUser size={20} />;
// const BagIcon = () => <FaShoppingBag size={20} />;
const CartHeart = () => <TbShoppingCartHeart size={28} color={'#ff00ff'} />;// Icono de carrito con corazón
const UserHeart = () => <RiUserHeartLine size={28} color={'#ff00ff'} />;// Icono de usuario con corazón
const SettingsIcon = () => <MdOutlineSettingsSuggest size={24} color={'#ff00ff'} />;// Icono de configuración

const Header = ({ contadorEnCarrito = 0 }) => {
  const { busqueda, setBusqueda } = useBusqueda(); //*
  const { estaLogueado, logout, usuario } = useAuthContext();
  const navigate = useNavigate();
  const esAdmin = usuario === 'admin';
  const manejarLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
      {/* Seccion Izquierda: Logo */}
      <div className="fs-4 fw-bold me-3">
        <Link to="/" className="text-white text-decoration-none">AndromedA's Palace</Link>
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className="d-none d-lg-block" >
        <NavBar />
      </div>
      {/* Input de búsqueda */}
      <div className="d-none d-lg-block ms-3" >
        <input
          type="text"
          placeholder="Buscar productos..." //*
          className="form-control mb-3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '250px' }
          }
        />
      </div>
      {/* Seccion Derecha: Iconos */}
      <div className="d-flex align-items-center">
        {/* Icono de Usuario */}
        <div className="me-3 d-flex align-items-center">
          {estaLogueado ? (
            <>
              <button
                onClick={manejarLogout}
                className="btn btn-link text-white text-decoration-none p-0 d-flex align-items-center"
              >
                <UserHeart />
                <span className="ms-2">Cerrar Sesión</span>
              </button>
              {esAdmin ? (
                <Link to="/admin" className="ms-3 text-white text-decoration-none d-flex align-items-center">
                  <SettingsIcon />
                </Link>
              ) : (
                <Link to="/carrito" className="ms-3 text-white text-decoration-none d-flex align-items-center">
                  <CartHeart />
                  {contadorEnCarrito > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.75rem' }}>
                      {contadorEnCarrito}
                    </span>
                  )}
                </Link>
              )}
            </>
          ) : (
            <Link to="/login" className="text-white text-decoration-none d-flex align-items-center">
              <UserHeart />
              <span className="ms-2">Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
