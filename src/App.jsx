import { useState } from 'react';
import Carrito from './components/Carrito';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Moda from './components/Moda';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './components/ProductoDetalle';
import Contacto from './components/Contacto'; 
import Joyas from './components/Joyas';

import Footer from './components/Footer';
import Tecnologia from './components/Tecnologia';


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
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/joyas' element={<Joyas/>}/>

      </Routes> 
      <Footer/>     
    </>
  )
}

export default App
