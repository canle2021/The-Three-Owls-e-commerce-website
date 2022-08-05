import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
const FeaturedCategories = () => {
  const navigate = useNavigate();
  const allCategoriesButton = (e) => {
    navigate("/catalog");
  };
  return (
    <DivCenter>
      <CompContainer>
        <BoxContainer>
          <CategoriesBox />
          <CategoriesBoxTitle>Fitness</CategoriesBoxTitle>
        </BoxContainer>
        <BoxContainer>
          <CategoriesBox />
          <CategoriesBoxTitle>Entertainment</CategoriesBoxTitle>
        </BoxContainer>
        <BoxContainer>
          <CategoriesBox />
          <CategoriesBoxTitle>Gaming</CategoriesBoxTitle>
        </BoxContainer>
        <BoxContainer>
          <CategoriesBox />
          <CategoriesBoxTitle>Industrial</CategoriesBoxTitle>
        </BoxContainer>
      </CompContainer>
      <ViewAllButton onClick={allCategoriesButton}>
        See all Categories
      </ViewAllButton>
    </DivCenter>
  );
};

const DivCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;
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
  &:hover h3 {
    color: #7900d9;
    transition: 0.3s ease-in;
  }
`;

const CategoriesBox = styled.div`
  width: 280px;
  height: 280px;
  background-color: #d9d9d9;
  border-radius: 10px;
  :hover& {
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 4px 8px 0px;
    transition: 0.3s ease-in;
  }
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

const ViewAllButton = styled.button`
  height: 50px;
  width: 200px;
  border: 1px solid #7900d9;
  border-radius: 3px;
  text-transform: uppercase;
  background-color: transparent;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: #7900d9;
    color: white;
    transition: 0.7s ease-in;
  }
`;
export default FeaturedCategories;
