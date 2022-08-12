import React, { createContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId") ? localStorage.getItem("orderId") : null
  );
  const [cart, setCart] = usePersistedState([], "cart");

  const getCartItemQty = (id) => {
    if (!cart || cart.length === 0) {
      return 0;
    }

    const cartItem = cart.find(item => parseInt(item.id) === parseInt(id));
    if (!cartItem) {
      return 0
    }
    else {
      return parseInt(cartItem.qty);
    }
  }


  return (
    <CartContext.Provider value={{ cart, setCart, orderId, setOrderId, getCartItemQty }}>
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
};

export default CartProvider;
