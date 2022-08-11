import React, { createContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId") ? localStorage.getItem("orderId") : null
  );
  const [cart, setCart] = usePersistedState([], "cart");

  return (
    <CartContext.Provider value={{ cart, setCart, orderId, setOrderId }}>
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
};

export default CartProvider;
