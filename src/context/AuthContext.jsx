import { useState, useContext, createContext, use, useEffect } from 'react';
// creamos el contexto de Autenticacion 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    // Verificamos si hay un token en el localStorage al cargar la aplicacion
    const token = localStorage.getItem('authToken');
    const nombreUsuario = localStorage.getItem('usuario');
    if (token && nombreUsuario) {
      setUsuario(nombreUsuario);
    }
  }, []);

  const estaLogueado = !!usuario;
  
  const login = (nombreUsuario) => {
    // Simulamos la creacion del token 
    const token = `fake-token-${nombreUsuario}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('usuario', nombreUsuario);
    setUsuario(nombreUsuario);
  }                                        
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{usuario, login, logout, estaLogueado}}>
      {children}
    </AuthContext.Provider>
  ); 
}

export const useAuthContext = () => useContext(AuthContext);