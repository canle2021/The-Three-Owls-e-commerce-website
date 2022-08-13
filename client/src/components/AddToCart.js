import React, { useEffect, useState, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { CartContext } from "./CartContext";
import { FiLoader } from "react-icons/fi";

import CartItem from "./CartItem";
import CustomerForm from "./CustomerFrom";

const AddToCart = () => {
  const { cart, setCart, cartTotal, setCartTotal, calculateCartTotal } =
    useContext(CartContext);
  const [loading, setLoading] = useState();
  const [cartObjectsArray, setCartObjectsArray] = useState([]);
  const cartItemsRef = useRef();

  useEffect(() => {
    let promises = [];

    setLoading(true);
    let cartArray = [];
    cart.forEach((cartItem) => {
      promises.push(
        fetch(`get-item/${cartItem.id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            cartArray.push({
              ...data.data,
              price: parseFloat(data.data.price.slice(1)).toFixed(2),
              qty: cartItem.qty,
            });
          })
          .catch((err) => {
            console.log("err", err);
          })
      );
    });

    Promise.all(promises)
      .then(() => {
        setCartObjectsArray(cartArray);
      })
      .then(() => {
        setCartTotal(calculateCartTotal(cartObjectsArray));
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updatedCartObjectsArray = cartObjectsArray.map((cartArrayObject) => {
      const cartItem = cart.find(
        (cartItem) => cartArrayObject && (parseInt(cartItem.id) === cartArrayObject._id)
      );
      if (cartItem) {
        cartArrayObject.qty = cartItem.qty;
        return cartArrayObject;
      }
    });
    if (updatedCartObjectsArray) {
      setCartObjectsArray(updatedCartObjectsArray);
      setCartTotal(calculateCartTotal(updatedCartObjectsArray));
    } else {
      setCartObjectsArray([]);
      setCartTotal(0);
    }
  }, [cart]);

  return !loading ? (
    <>
      <CartPageDiv>
        <PageContainer>
          <PageTitle>Cart</PageTitle>
          <CartItems ref={cartItemsRef}>
            {cartObjectsArray.map(
              (cartObject) =>
                cartObject && (
                  <CartItem key={cartObject._id} cartItem={cartObject} />
                )
            )}
          </CartItems>
          <CartTotal>
            <TotalAmount> {`Total $${cartTotal}`}</TotalAmount>
          </CartTotal>
          <CheckoutSection>
            {/* <CheckoutButton>Checkout</CheckoutButton> */}
          </CheckoutSection>
        </PageContainer>
        <CustomerForm cartObjectsArray={cartObjectsArray} />
      </CartPageDiv>
    </>
  ) : (
    <LoaderDiv>
      <FiLoader />
    </LoaderDiv>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const CartPageDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoaderDiv = styled.div`
  font-size: 50px;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${rotate} infinite 4s linear;
`;

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const PageTitle = styled.div`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 50px;
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
  margin-top: 10px;
  font-size: 25px;
  font-weight: bold;
`;

const CheckoutSection = styled.div`
  display: flex;
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
