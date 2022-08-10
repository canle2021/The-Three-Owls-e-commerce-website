import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const constructionPage = () => {
    navigate("/construction");
  };
  const { allCateogries } = useContext(CurrentUserContext);
  return (
    <CompContainer>
      <CompBackground>
        <BoxContainer>
          <FirstSection allCateogries={allCateogries} />
          <SecondSection constructionPage={constructionPage} />
          <ThirdSection />
        </BoxContainer>
        <BottomBar />
      </CompBackground>
    </CompContainer>
  );
};

const FirstSection = ({ allCateogries }) => {
  return (
    <ContentContainer>
      <SectionTitle>Categories</SectionTitle>
      <ul>
        {allCateogries &&
          allCateogries.map((categories) => {
            return (
              <Link to={`/collection/${categories}`}>
                <LinkSelect key={categories}>{categories}</LinkSelect>
              </Link>
            );
          })}
      </ul>
    </ContentContainer>
  );
};

const SecondSection = ({ constructionPage }) => {
  return (
    <ContentContainer>
      <SectionTitle>Information</SectionTitle>
      <ul>
        <LinkSelect onClick={constructionPage}>About us</LinkSelect>
        <LinkSelect onClick={constructionPage}>Contact</LinkSelect>
        <LinkSelect onClick={constructionPage}>Payment methods</LinkSelect>
        <LinkSelect onClick={constructionPage}>Shipping & returns</LinkSelect>
        <LinkSelect onClick={constructionPage}>
          General terms & conditions
        </LinkSelect>
      </ul>
    </ContentContainer>
  );
};

const ThirdSection = () => {
  return (
    <WidthContainer>
      <PromoText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </PromoText>
    </WidthContainer>
  );
};

const BottomBar = () => {
  return (
    <Copyright>
      <CopyrightText>© 2022 ThreeFunctions</CopyrightText>
    </Copyright>
  );
};
const CompContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const CompBackground = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
`;

const ContentContainer = styled.div`
  margin-right: 150px;
  height: auto;
  color: white;
`;

const SectionTitle = styled.h3`
  font-size: 25px;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  margin-bottom: 20px;
`;

const LinkSelect = styled.li`
  font-size: 16px;
  line-height: 35px;

  &:hover {
    cursor: pointer;
    color: #7900d9;
    transition: 0.3s ease-in;
  }
`;

const PromoText = styled.p`
  font-family: "IBM Plex Sans";
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: white;
`;

const Copyright = styled.div`
  height: 70px;
  width: 1200px;
  border-top: 0.5px solid rgb(255, 255, 255, 0.5);
  color: white;
  text-align: center;
  margin-top: 100px;
`;

const CopyrightText = styled.div`
  margin-top: 30px;
`;

const WidthContainer = styled.div`
  width: 350px;
  height: auto;
`;
export default Footer;
