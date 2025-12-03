import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
//importamos iconos de react icons-fontawesome
import { TbShoppingCartHeart } from "react-icons/tb"; // Icono de carrito con corazón
import { RiUserHeartLine } from "react-icons/ri"
import { useBusqueda } from '../context/BusquedaContext';
import { useAuthContext } from '../context/AuthContext';
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { CarritoContext } from '../context/CarritoContext';
import { useContext } from 'react';


// Definición de los iconos  
const CartHeart = () => <TbShoppingCartHeart size={28} color={'#ff00ff'} />;// Icono de carrito con corazón
const UserHeart = () => <RiUserHeartLine size={28} color={'#ff00ff'} />;// Icono de usuario con corazón
const SettingsIcon = () => <MdOutlineSettingsSuggest size={24} color={'#ff00ff'} />;// Icono de configuración

const Header = () => {
  const { busqueda, setBusqueda } = useBusqueda(); //*
  const { estaLogueado, logout, usuario } = useAuthContext();
  const navigate = useNavigate();
  const esAdmin = usuario === 'admin';
  const { carrito } = useContext(CarritoContext);
  const contadorEnCarrito = carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
  const manejarLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <>
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000
        }}
      >
        {/* MENU HAMBURGUESA (MÓVIL) */}
        <button
          className="btn btn-outline-light d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuMovil"
        >
          ☰
        </button>

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
                <p className="mb-0 me-3">Hola, {usuario}</p>
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
                    <div style={{ position: 'relative' }}>
                    
                    <CartHeart />
                    {contadorEnCarrito > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.75rem' }}>
                        {contadorEnCarrito}
                      </span>
                    )}
                    </div>
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
      {/* OFFCANVAS (MENÚ MÓVIL) */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="menuMovil"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menú</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">

          {/* NAVBAR MOBILE */}
          <div className="navbar-mobile">
            <NavBar />
          </div>

          <hr className="border-secondary" />

          {/* BUSCADOR MOBILE */}
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* ICONOS MOBILE */}
          <div className="mt-3">
            {estaLogueado ? (
              <>
                <p>Hola, {usuario}</p>

                <button
                  onClick={manejarLogout}
                  className="btn btn-outline-light w-100 mb-3"
                >
                  <UserHeart /> Cerrar Sesión
                </button>

                {esAdmin ? (
                  <Link to="/admin" className="btn btn-outline-light w-100 mb-3">
                    <SettingsIcon /> Admin
                  </Link>
                ) : (
                  <Link to="/carrito" className="btn btn-outline-light w-100 mb-3">
                    <CartHeart /> Carrito ({contadorEnCarrito})
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-light w-100">
                <UserHeart /> Iniciar Sesión
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
