import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

import ProductSection from "./ProductSection";
import Slider from "./Slider";
import FeaturedCategories from "./FeaturedCategories";

const HomePage = () => {
  return (
    <PageContainer>
      <Slider />
      <SectionTitle>Top Categories</SectionTitle>
      <FeaturedCategories />
      <SectionTitle>Product Section</SectionTitle>
      <ProductSection />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 50px;
  margin-top: 30px;
`;
export default HomePage;
