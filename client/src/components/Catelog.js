// import { Box } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import categoriesBackground from "../components/asset/categoriesBanner.jpg";

const Catelog = () => {
  const { allCateogries } = useContext(CurrentUserContext);
  console.log("HELLOOO", allCateogries);
  return (
    <PageContainer>
      <SectionTitle>All categories</SectionTitle>
      <CompContainer>
        {allCateogries &&
          allCateogries.map((categories, index) => {
            const linkToEachCategory =
              "/collection/" + `${allCateogries[index]}`;
            return (
              <Link to={linkToEachCategory}>
                <BoxContainer>
                  <CategoriesBox categoriesBackground={categoriesBackground}>
                    <CategoriesBoxTitle>{categories}</CategoriesBoxTitle>
                  </CategoriesBox>
                </BoxContainer>
              </Link>
            );
          })}
      </CompContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CompContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`;

const BoxContainer = styled.div`
  width: 280px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
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
  margin-bottom: 20px;
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

const SectionTitle = styled.h2`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 100px;
  margin-top: 20px;
  text-align: center;
`;

export default Catelog;
