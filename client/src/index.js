import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./style.css";
import CurrentUserProvider from "./components/CurrentUserContext";
import CartProvider from "./components/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
