import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import categoriesBackground from "../components/asset/categoriesBanner.jpg";
const FeaturedCategories = () => {
  const navigate = useNavigate();
  const allCategoriesButton = (e) => {
    navigate("/catalog");
  };
  return (
    <DivCenter>
      <CompContainer>
        <Link to="/collection/Fitness">
          <BoxContainer>
            <CategoriesBox categoriesBackground={categoriesBackground}>
              <CategoriesBoxTitle>Fitness</CategoriesBoxTitle>{" "}
            </CategoriesBox>
          </BoxContainer>
        </Link>
        <Link to="/collection/Entertainment">
          <BoxContainer>
            <CategoriesBox categoriesBackground={categoriesBackground}>
              <CategoriesBoxTitle>Entertainment</CategoriesBoxTitle>
            </CategoriesBox>
          </BoxContainer>
        </Link>
        <Link to="/collection/Gaming">
          <BoxContainer>
            <CategoriesBox categoriesBackground={categoriesBackground}>
              <CategoriesBoxTitle>Gaming</CategoriesBoxTitle>
            </CategoriesBox>
          </BoxContainer>
        </Link>
        <Link to="/collection/Industrial">
          <BoxContainer>
            <CategoriesBox categoriesBackground={categoriesBackground}>
              <CategoriesBoxTitle>Industrial</CategoriesBoxTitle>
            </CategoriesBox>
          </BoxContainer>
        </Link>
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
  background-image: url(${(props) => props.categoriesBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoriesBoxTitle = styled.h3`
  font-size: 25px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
`;

const ViewAllButton = styled.button`
  height: 50px;
  width: 200px;
  border: 1px solid #7900d9;
  border-radius: 3px;
  text-transform: uppercase;
  background-color: transparent;
  font-weight: 600;
  margin-top: 50px;
  &:hover {
    cursor: pointer;
    background-color: #7900d9;
    color: white;
    transition: 0.7s ease-in;
  }
`;
export default FeaturedCategories;
