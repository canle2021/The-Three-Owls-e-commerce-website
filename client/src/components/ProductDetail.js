import React, { useEffect, useContext, useRef, useState } from "react";
import styled, {keyframes} from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { CartContext } from "./CartContext";
import {FiLoader} from "react-icons/fi";
import QuantitySelector from "./QuantitySelector";


const ProductDetail = () => {
  const { singleProduct, setSingleProduct } = useContext(CurrentUserContext);
  const {cart, setCart} = useContext(CartContext);
  const { id } = useParams();
  const qtyRef = useRef();
  const [loading, setLoading] = useState();
  const [qty, setQty] = useState(1);


  useEffect(() => {
    setLoading(true);

    fetch(`/get-item/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSingleProduct(data.data || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(()=> setLoading(false));
  }, [id]);
  // console.log("data", singleProduct);

  const addToCart = () => {
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
    (!loading) ?
      <>
        <PageContainer>
          <img src={singleProduct.imageSrc} alt="Item Image"/>
          <ProductInformation>
            <ProductName>{singleProduct.name}</ProductName>
            <ProductCategory>{singleProduct.category}</ProductCategory>
            <ProductPrice>{singleProduct.price}</ProductPrice>
            <ProductQty>
              <QuantitySelector qty={qty} setQty={setQty} inStock={singleProduct.numInStock} showStock={true}/>
            </ProductQty>
            <AddToCartButton disabled={!singleProduct.numInStock} onClick={addToCart}>Add To Cart</AddToCartButton>
          </ProductInformation>
        </PageContainer>
      </>
    :
      <LoaderDiv>
        <FiLoader/>
      </LoaderDiv>
  );
};
const ProductInformation = styled.div`
  flex-direction: column;
`;
const ProductName = styled.p``;
const ProductCategory = styled.p``;
const ProductPrice = styled.p``;

const ProductQty = styled.div`
display: flex;
padding: 5px 0px;
`;

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderDiv = styled.div `
  font-size: 50px;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${rotate} infinite 4s linear;
`;

const AddToCartButton = styled.button `
  width: 100px;
  height: 30px;
  margin: 10px 0px;
  background-color: #7900d9;
  color: white;
  border-radius: 5px;
  &:disabled {
    opacity: 0.4;
  }
`;


export default ProductDetail;
