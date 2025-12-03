import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductosContext";
import { BusquedaProvider } from "./context/BusquedaContext";
import { CarritoProvider } from "./context/CarritoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <BusquedaProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </BusquedaProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode >
);
