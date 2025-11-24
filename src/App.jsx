import { useState } from 'react';
import Carrito from './components/Carrito';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Moda from './pages/Moda';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './pages/ProductoDetalle';
import Contacto from './components/Contacto'; 
import Joyas from './pages/Joyas';
import Footer from './components/Footer';
import Tecnologia from './pages/Tecnologia';
import Login from './pages/login';
import RutaProtegida from './components/RutaProtegida';
import Admin from './pages/Admin'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  
    return (
    <>
      <Header/>

        <Routes> 
        <Route path='/' element={<Inicio />}/> 
        <Route path='/moda' element={<Moda />}/> 
        <Route path='/tecnologia' element={<Tecnologia />}/> 
        <Route path='/contacto' element={<Contacto />}/>
        <Route path='/productos/:id' element={<ProductoDetalle />}/>
        <Route path='/carrito' element={<RutaProtegida><Carrito/></RutaProtegida>}/>
        <Route path='/joyas' element={<Joyas/>}/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/admin' element={<RutaProtegida><Admin/></RutaProtegida>}/>

      </Routes> 
      <Footer/>    
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> 
    </>
  )
}

export default App
