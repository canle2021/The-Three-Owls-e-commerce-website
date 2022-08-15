import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Slider = ({ slider1 }) => {
  const navigate = useNavigate();
  const shopLink = (e) => {
    navigate("/catalog");
  };
  return (
    <CompContainer>
      <SliderBanner slider1={slider1}>
        <TextPosition>
          <SectionTitle>Shop online in our store.</SectionTitle>
          <ShopButton onClick={shopLink}>Shop Now</ShopButton>
        </TextPosition>
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
  background-image: url(${(props) => props.slider1});
  background-repeat: no-repeat;
  background-size: cover;
`;

const TextPosition = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 35px;
  color: white;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 50px;
  /* text-align: center; */
`;

const ShopButton = styled.button`
  height: 50px;
  width: 200px;
  border: 1px solid #7900d9;
  border-radius: 3px;
  text-transform: uppercase;
  background-color: white;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: 0.2s ease-in;
    box-shadow: rgba(99, 99, 99, 0.5) 0px 4px 16px 0px;
  }
`;
export default Slider;
