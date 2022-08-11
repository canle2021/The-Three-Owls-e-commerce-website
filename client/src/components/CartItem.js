import React, {useContext, useState, useRef, useEffect} from "react";
import styled from "styled-components";
import {FiLoader} from "react-icons/fi";
import { CartContext } from "./CartContext";
import { CurrentUserContext } from "./CurrentUserContext";
import QuantitySelector from "./QuantitySelector";



const CartItem = ({cartItem}) => {

  const cartItemRef = useRef();
  const {cart, setCart} = useContext(CartContext);
  const [loading, setLoading] = useState();
  const [cartLength, setCartLength] = useState(0);
  const [qty, setQty] = useState(cartItem.qty);

  useEffect (()=> {
    const updatedCart = cart.map((anItem) => {
      if (parseInt(anItem.id) === cartItem._id) {
        anItem.qty= qty;
        return anItem;
      }
      else {
        return anItem;
      }
    });
  
    setCart([...updatedCart]);
  }, [qty])


  const deleteItem = () => {
    cartItemRef.current.style.display = "none";
    const newCart = cart.filter(item => {
      console.log(`${item.id} != ${cartItem._id}`,item.id != cartItem._id);
      return (item.id != cartItem._id);
    });

    setCart(newCart);
  }

  return (
    <CartItemContainer ref={cartItemRef}>
      <ItemImage src={cartItem.imageSrc} alt="image"/>
      <ItemDetails>
          <ItemDescription>{cartItem.name}</ItemDescription>
          <QuantitySection>
            <QuantityOrderedLabel>Qty Ordered:</QuantityOrderedLabel>
            <QuantitySelector qty={qty} setQty={setQty} inStock={cartItem.numInStock} showStock={true}/>
          </QuantitySection>
          <CategoryInformation>
            <Category>{`Category: ${cartItem.category}`} </Category>
            <BodyLocation>{`Body Part: ${cartItem.body_location}`} </BodyLocation>
          </CategoryInformation>
          <ItemUnitPrice>{`Unit Price: $${cartItem.price}`}</ItemUnitPrice>
      </ItemDetails>
      <ItemTotal>
          <ItemTotalTitle>Total</ItemTotalTitle>
          <ItemTotalPrice>{`$${parseFloat(qty * cartItem.price).toFixed(2)}`}</ItemTotalPrice>
      </ItemTotal>
      <DeleteItem>
          <DeleteItemButton onClick={deleteItem}>X</DeleteItemButton>
      </DeleteItem>
    </CartItemContainer>
  );
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
  margin-left: 20px;
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

const QuantitySection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const QuantityOrderedLabel = styled.label`
  width: 100px;
  `;

const ItemUnitPrice = styled.h1``;

const CategoryInformation = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Category = styled.h1`
    width: 180px;
`;

const BodyLocation = styled.h1`
    margin: 0px 20px;
`;

export default CartItem;

