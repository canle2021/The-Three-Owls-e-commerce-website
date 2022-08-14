/* eslint-disable*/

import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import QuantitySelector from "./QuantitySelector";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

const CartItem = ({ cartItem }) => {
  const cartItemRef = useRef();
  const { cart, setCart } = useContext(CartContext);
  const [qty, setQty] = useState(cartItem.qty);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedCart = cart.map((anItem) => {
      if (parseInt(anItem.id) === cartItem._id) {
        anItem.qty = qty;
        return anItem;
      } else {
        return anItem;
      }
    });
    setCart([...updatedCart]);
  }, [qty]);

  const deleteItem = () => {
    cartItemRef.current.style.display = "none";
    const newCart = cart.filter((item) => {
      return parseInt(item.id) !== parseInt(cartItem._id);
    });

    setCart(newCart);
  };

  return (
    <CartItemContainer ref={cartItemRef}>
      <ItemImage>
        <NavLink to={`/product/${cartItem._id}`}>
          <img
            src={cartItem.imageSrc}
            width="100%"
            height="100%"
            alt="productImg"
          />
        </NavLink>
      </ItemImage>
      <ItemDetails>
        <ItemDescription>{cartItem.name}</ItemDescription>
        <CategoryInformation>
          <Category>
            {`Category: ${cartItem.category}   |   Body Part: ${cartItem.body_location}`}{" "}
          </Category>
        </CategoryInformation>
        <ItemUnitPrice>{`Per unit: $${cartItem.price}`}</ItemUnitPrice>{" "}
        <QuantitySection>
          <QuantityOrderedLabel>Qty Ordered:</QuantityOrderedLabel>
          <QuantitySelector
            qty={qty}
            setQty={setQty}
            inStock={cartItem.numInStock}
            showStock={true}
          />
        </QuantitySection>
      </ItemDetails>
      <DeleteItem>
        <DeleteItemButton onClick={deleteItem}>
          <FaRegTrashAlt style={{ fontSize: "20px" }} />
        </DeleteItemButton>
      </DeleteItem>
    </CartItemContainer>
  );
};

const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
  align-items: center;
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: -45px;
`;

const DeleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteItemButton = styled.button`
  color: black;
  width: 50px;
  height: 50px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-weight: bold;
  background: transparent;
  &:hover {
    color: white;
    background-color: black;
    cursor: pointer;
  }
`;

const ItemDescription = styled.p`
  width: 80%;
  font-size: 20px;
  line-height: 30px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const QuantitySection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
`;

const QuantityOrderedLabel = styled.label`
  width: 100px;
`;

const ItemUnitPrice = styled.p`
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const CategoryInformation = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Category = styled.h1`
  margin-right: 20px;
  color: gray;
`;

export default CartItem;
