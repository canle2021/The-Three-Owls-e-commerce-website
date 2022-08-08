import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { CartContext } from "./CartContext";

const ProductDetail = () => {
  const { singleProduct, setSingleProduct } = useContext(CurrentUserContext);
  const {cart, setCart} = useContext(CartContext);
  const { id } = useParams();
  const qtyRef = useRef();

  useEffect(() => {
    fetch(`/get-item/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSingleProduct(data.data || []);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);
  // console.log("data", singleProduct);

  const addToCart = () => {
    const qty = Number.parseInt(qtyRef.current.value);
    const newItem = {id, qty};
    
    //check if the product is already in the list
    const alreadyInCart = cart.some(cartItem => cartItem.id === id);

    if (!alreadyInCart) {
      setCart([...cart, newItem]);
    }
    else {
      const newCart = cart.map(cartItem => {
        if (cartItem.id === id) {
          cartItem.qty += newItem.qty;
          return cartItem;
        }
        else {
          return cartItem;
        }
      })

      setCart (newCart);
    }
  }

  return (
    <>
      <PageContainer>
        <img src={singleProduct.imageSrc} alt="Item Image"/>
        <ProductInformation>
          <ProductName>{singleProduct.name}</ProductName>
          <ProductCategory>{singleProduct.category}</ProductCategory>
          <ProductPrice>{singleProduct.price}</ProductPrice>
          <input ref={qtyRef} type="text" style={{width:"40px", marginRight: "10px"}} />
          <button onClick={addToCart}>Add To Cart</button>
        </ProductInformation>
      </PageContainer>
    </>
  );
};
const ProductInformation = styled.div`
  flex-direction: column;
`;
const ProductName = styled.p``;
const ProductCategory = styled.p``;
const ProductPrice = styled.p``;

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default ProductDetail;
