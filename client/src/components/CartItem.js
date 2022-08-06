import React, {useContext, useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";


const CartItem = ({cartItem}) => {

  const cartItemRef = useRef();
  const {cart, setCart} = useContext(CartContext);



  const deleteItem = () => {
    cartItemRef.current.style.display = "none";
    setCart(cart.filter(item => item.id !== cartItem.id));
  }

  return (
      <CartItemContainer ref={cartItemRef}>
        <ItemImage src={cartItem.src} alt="image"/>
        <ItemDetails>
            <ItemDescription>{cartItem.name}</ItemDescription>
            <ItemQuantity>{`Qty: ${cartItem.qty}`}</ItemQuantity>
            <ItemUnitPrice>{`Unit Price: $${cartItem.price}`}</ItemUnitPrice>
        </ItemDetails>
        <ItemTotal>
            <ItemTotalTitle>Total</ItemTotalTitle>
            <ItemTotalPrice> ${cartItem.qty * cartItem.price}</ItemTotalPrice>
        </ItemTotal>
        <DeleteItem>
            <DeleteItemButton onClick={deleteItem}>X</DeleteItemButton>
        </DeleteItem>
      </CartItemContainer>
  )
}

const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  margin: 5px 0px;
  border-radius: 3px;
  padding: 3px;
`;

const ItemImage = styled.img`
  width: 8%;
  height:auto;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ItemTotal = styled.div`
  width: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemTotalTitle = styled.div`
  font-weight: bold;
`;

const ItemTotalPrice = styled.div`

`;

const DeleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3%;
`;

const DeleteItemButton = styled.button`
  color: red;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-weight: bold;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: red;
  }
`;

const ItemDescription = styled.h1``;

const ItemQuantity = styled.div``;

const ItemUnitPrice = styled.h1``;

export default CartItem;

