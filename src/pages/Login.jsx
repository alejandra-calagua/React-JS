import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const { login, estaLogueado, usuario: usuarioContexto } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (estaLogueado){ 
      if( usuarioContexto === 'admin') {
      navigate('/admin');
    }else {
      navigate('/');
    }
    }
  }, [estaLogueado, usuarioContexto, navigate]);

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    // Simulamos la Autenticacion
    if (usuario == 'admin' && contrasenia == '1234') {
      login(usuario);
      navigate('/admin');
    } else if (usuario == 'proyecto' && contrasenia == 'abcd') {
      login(usuario);
      navigate('/');
    } else {

      toast.warning('Usuario o Contraseña invalido');
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-4 " >
      <form
        className="w-100 m-auto p-4 border rounded shadow"
        style={{ maxWidth: '380px' }}
        onSubmit={manejarSubmit}
      >
        <img
          className="mb-4 d-block mx-auto"
          src="/proteccion.png"
          alt="Logo inicio de sesión"
          width="72"
          height="72"
        />
        <h3 className="mb-3 fw-normal text-center">Iniciar Sesión</h3>

        {/* Campo de Usuario */}
        <div className="mb-3">
          <label htmlFor="inputUsuario">Usuario</label>
          <input
            type='text'
            className='form-control' // Clase Bootstrap para estilos de input
            id='inputUsuario'
            value={usuario}
            onChange={(evento) => setUsuario(evento.target.value)}
            required
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-3">
          <label htmlFor="inputContrasenia">Contraseña</label>
          <input
            type='password'
            className='form-control'
            id='inputContrasenia'
            value={contrasenia}
            onChange={(evento) => setContrasenia(evento.target.value)}
            required
          />
        </div>

        {/* Botón */}
        <button
          type='submit'
          className='btn btn-primary w-100 py-2 ' // Clase Bootstrap para botón primario y ancho completo
        >
          Iniciar Sesion
        </button>
      </form>

    </div>
  );
}

export default Login;