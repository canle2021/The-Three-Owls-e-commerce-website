import React from "react";
import styled from "styled-components";

const FeaturedCategories = () => {
  return (
    <CompContainer>
      <BoxContainer>
        <CategoriesBox />
        <CategoriesBoxTitle>Category 1</CategoriesBoxTitle>
      </BoxContainer>
      <BoxContainer>
        <CategoriesBox />
        <CategoriesBoxTitle>Category 2</CategoriesBoxTitle>
      </BoxContainer>
      <BoxContainer>
        <CategoriesBox />
        <CategoriesBoxTitle>Category 3</CategoriesBoxTitle>
      </BoxContainer>
      <BoxContainer>
        <CategoriesBox />
        <CategoriesBoxTitle>Category 4</CategoriesBoxTitle>
      </BoxContainer>
    </CompContainer>
  );
};

const CompContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

const BoxContainer = styled.div`
  width: 280px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const CategoriesBox = styled.div`
  width: 280px;
  height: 280px;
  background-color: #d9d9d9;
`;

const CategoriesBoxTitle = styled.h3`
  font-size: 20px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  margin-bottom: 50px;
  margin-top: 15px;
  text-align: center;
`;

export default FeaturedCategories;
