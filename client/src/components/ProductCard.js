import React from "react";
import styled from "styled-components";

const ProductCard = () => {
  const productDec = {
    name: "Coleman G7HD-SWIM POV 1080p 5 Megapixel Goggles Camcorder ELBG7HDSWIM",
    price: "253$",
  };

  const productTitle = productDec.name;
  return (
    <BoxContainer>
      <ProductImg />
      <ProductInfo>
        <ProductName>
          {productTitle.length >= 50
            ? productTitle.slice(0, 50) + "..."
            : productTitle}
        </ProductName>
        <ProductPrice>{productDec.price}</ProductPrice>
        <AddToCart>Add to cart</AddToCart>
      </ProductInfo>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  width: 280px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  :hover& {
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.5) 0px 4px 16px 0px;
    transition: 0.5s ease-in;
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProductName = styled.p`
  font-size: 20px;
  line-height: 27px;
  width: 85%;
  color: black;
  text-align: center;
  font-weight: 500;
  margin-block-start: 0px;
`;

const ProductPrice = styled.p`
  font-size: 25px;
  color: #51038f;
  text-align: center;
  font-family: "Roboto", sans-serif;
  margin-top: 5px;
  font-weight: 500;
`;

const ProductImg = styled.div`
  width: 100%;
  height: 250px;
  background-color: #393636;
`;

const AddToCart = styled.button`
  width: 100%;
  height: 70px;
  background: rgb(121, 0, 217);
  background: linear-gradient(
    90deg,
    rgba(121, 0, 217, 1) 0%,
    rgba(159, 0, 215, 1) 100%
  );
  border: none;
  margin-bottom: 0px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
  :hover& {
    cursor: pointer;
    background-color: #51038f;
    transition: 0.5s ease-in-out;
  }
`;

export default ProductCard;
