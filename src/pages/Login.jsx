import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  
  const { login } = useAuthContext();
  const navigate = useNavigate();
  
  const manejarSubmit = (evento) => {
    evento.preventDefault();
    // Simulamos la Autenticacion
    if(usuario == 'admin' && contrasenia == '1234') {
      login(usuario);
      navigate('/admin');
    } else {
      alert('Usuario o Contraseña invalido');
    }
  }

  return (
    <>
      <form onSubmit={manejarSubmit}>
        <h3>Iniciar Sesion</h3>
        <label htmlFor=''>Usuario</label>
        <br/>
        <input 
          type='text'
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
        />
        <br/>
        <label htmlFor=''>Contraseña</label>
        <br/>
        <input 
          type='text'
          value={contrasenia}
          onChange={(evento) => setContrasenia(evento.target.value)}
        />
        <button type='submit'>Iniciar Sesion</button>
      </form>
    </>    
  );
}

export default Login;