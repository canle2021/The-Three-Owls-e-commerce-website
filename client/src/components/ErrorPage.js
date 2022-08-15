import React from "react";
import styled from "styled-components";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const homepageButton = (e) => {
    navigate("/");
  };
  return (
    <BoxContainer>
      <ErrorText>Ops! There is an error.</ErrorText>
      <BsExclamationTriangleFill
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          fontSize: "100px",
          color: "#d42619",
        }}
      />
      <BodyText>
        You could refresh the page or click on the button below to go back to
        home page.
      </BodyText>

      <GoHomepage onClick={homepageButton}>Go to homepage</GoHomepage>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.h1`
  font-size: 35px;
  font-weight: 800;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
`;

const BodyText = styled.p`
  font-size: 16px;
  line-height: 25px;
  font-weight: 400;
`;

const GoHomepage = styled.button`
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
  margin-top: 40px;
`;

export default ErrorPage;
