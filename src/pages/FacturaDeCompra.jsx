import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

const FacturaDeCompra = () => {
    const navigate = useNavigate();
    const { carrito, vaciarCarrito } = useContext(CarritoContext);
    const[contador, setContador] = useState(10);

    // Calcular subtotal
    const subtotal = carrito.reduce((suma, producto) => {
        const cantidad = producto.cantidad || 1;
        return suma + (producto.price * cantidad);
    }, 0);
    const envio = 0; // Envío gratuito

    // Calcular total
    const total = subtotal + envio;

    useEffect(() => {
        const intervalo = setInterval(() => {
            setContador(prevContador => prevContador - 1);
        }, 1000);

        const timer = setTimeout(() => {
            vaciarCarrito();
            navigate('/');
        }, 10000); // Redirigir después de 10 segundos
        return () =>{
            clearInterval(intervalo);
            clearTimeout(timer);
        };
    }, [navigate, vaciarCarrito]);

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4"> Factura de compra </h2>
                <p className="text-muted text-center"> Gracias por tu compra! Esta es tu factura </p>
                <div className="border rounded p-3 mb-4">
                    <p><strong>Numero de factura:</strong> #{Math.floor(Math.random() * 1000000)}</p>
                    <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <h4 className="border-bottom pb-2">Productos: </h4>
                <div className="list-group mb-4">
                    {carrito.map((producto, indice) => (
                        <div key={indice} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <img src={producto.image} alt={producto.title} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="me-3" />
                                <div>
                                    <strong>{producto.title}</strong>
                                    <p className="mb-0 text-muted">Cantidad: {producto.cantidad || 1}</p>
                                </div>
                            </div>
                            <strong className="fs-5">${(producto.price * (producto.cantidad || 1)).toFixed(2)}</strong>
                        </div>
                    ))}
                </div>
                <div className="border-top pt-3">
                    <p className="d-flex justify-content-between fs-5">
                        <span>Subtotal:</span>
                        <strong>${subtotal.toFixed(2)}</strong>
                    </p>
                    <p className="d-flex justify-content-between fs-5">
                        <span>Envío:</span>
                        <strong>${envio.toFixed(2)}</strong>
                    </p>
                    <p className="d-flex justify-content-between border-top pt-2">
                        <span>Total:</span>
                        <strong className="text-success">${total.toFixed(2)}</strong>
                    </p>
                </div>
                <p className="text-center text-muted mt-4"> Serás redirigido a la página principal en <strong>{contador} segundos...</strong></p>
            </div>
        </div >
    );
};


export default FacturaDeCompra;