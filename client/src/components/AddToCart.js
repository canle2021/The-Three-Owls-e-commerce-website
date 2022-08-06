import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

import CartItem from "./CartItem";


const AddToCart = () => {
  const {cart, setCart} = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);
  console.log(`cart = `, cart);


  useEffect(() => {
    setCartTotal(cart.reduce((previousTotal, currentTotal, index, arr) => {
      console.log(`arr[index].price = `, arr[index].price);
      return previousTotal + arr[index].qty * Number.parseFloat(arr[index].price);
    }, 0));
  }, [cart]);

  return (
    <>
      <PageContainer>
        <PageTitle>Cart Page</PageTitle>
        <CartItems>
          {
            cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)
          }
        </CartItems>
        <CartTotal>
           <TotalAmount> {`Total Order Amount: $${parseFloat(cartTotal).toFixed(2)}`}</TotalAmount>
        </CartTotal>
        <CheckoutSection>
           <CheckoutButton>Checkout</CheckoutButton>
        </CheckoutSection>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
width: 1200px;
display: flex;
flex-direction: column;
`;

const PageTitle = styled.div`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 10px;
`;

const CartItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalAmount = styled.div`
  font-weight: bold;
`;

const CheckoutSection = styled.div`
  display:flex;
  justify-content: flex-end;
`;

const CheckoutButton = styled.button`
  color: white;
  background-color: blue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin-top: 10px;
`;


export default AddToCart;
