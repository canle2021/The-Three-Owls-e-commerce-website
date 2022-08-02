import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <CompContainer>
      <TopBar>
        <TopBarText>Welcome to our store!</TopBarText>
      </TopBar>
      <NavMiddleBox>{`Image Logo`}</NavMiddleBox>
      <NavMenu>
        <NavLink>Home</NavLink>
        <NavLink>Shop</NavLink>
        <NavLink>Sale</NavLink>
        <NavLink>Contact us</NavLink>
        <NavLink>About us</NavLink>
      </NavMenu>
    </CompContainer>
  );
};

const CompContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const TopBar = styled.div`
  background-color: #7900d9;
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopBarText = styled.div`
  color: white;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;

const NavMiddleBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

const NavMenu = styled.div`
  width: 100%;
  height: 50px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

const NavLink = styled.a`
  margin-right: 20px;
  color: white;
  font-family: "Roboto", sans-serif;
`;

export default Header;
