import React, { createContext, useState } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId") ? localStorage.getItem("orderId") : null
  );
  const [cart, setCart] = usePersistedState([], "cart");
  const [cartTotal, setCartTotal] = useState();

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
  };

  const calculateCartTotal = (cartObjectsArray) => {
 
    const total =  cartObjectsArray.reduce((previousTotal, currentValue, index, arr) => {
      if (arr[index])
        return previousTotal + (parseInt(arr[index].qty) * parseFloat(arr[index].price).toFixed(2));
      else 
        return previousTotal;
    }, 0).toFixed(2);
    return total;
  };


  return (
    <CartContext.Provider value={{ cart, setCart, orderId, setOrderId, getCartItemQty, cartTotal, setCartTotal,  calculateCartTotal}}>
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
};

export default CartProvider;
