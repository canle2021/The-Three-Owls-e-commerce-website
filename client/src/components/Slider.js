import { Slide } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Slider = () => {
  return (
    <CompContainer>
      <SliderBanner>
        <SectionTitle>Background Image</SectionTitle>
      </SliderBanner>
    </CompContainer>
  );
};

const CompContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  margin-top: -100px;
`;

const SliderBanner = styled.div`
  width: 100%;
  height: 650px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 35px;
  color: #5b5b5b;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 50px;
  text-align: center;
`;
export default Slider;
