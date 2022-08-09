import React from "react";
import styled from "styled-components";

const ProductCard = ({ pName, pPrice, imageSrc }) => {
  return (
    <BoxContainer>
      <ProductImg imageSrc={imageSrc} />
      <ProductInfo>
        <ProductName>
          {pName && pName.length >= 50
            ? pName && pName.slice(0, 50) + "..."
            : pName && pName}
        </ProductName>
        <ProductPrice>{pPrice}</ProductPrice>
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
  background-color: white;
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
  background-image: url(${(props) => props.imageSrc});
  background-repeat: no-repeat;
  background-position: center;
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
