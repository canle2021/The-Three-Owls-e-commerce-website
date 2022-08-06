import React, {createContext, useState} from "react";
import {usePersistedState} from "../hooks/usePersistedState";

export const CartContext = createContext(null);

const CartProvider = ({children}) => {
    const [cart, setCart] = usePersistedState([], "cart");

    return <CartContext.Provider value={{cart, setCart}}> {children} </CartContext.Provider>
}

export default CartProvider;

