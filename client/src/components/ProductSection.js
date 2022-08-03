import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  return (
    <CompContainer>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </CompContainer>
  );
};

const CompContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 250px;
`;

export default ProductSection;
