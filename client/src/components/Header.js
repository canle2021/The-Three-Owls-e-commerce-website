import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = ({ logo }) => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const allCategoriesButton = (e) => {
    navigate("/");
  };
  const shopLink = (e) => {
    navigate("/catalog");
  };

  const accessCart = () => {
    navigate("/cart");
  };

  const errorPage = () => {
    navigate("/error");
  };
  const constructionPage = () => {
    navigate("/construction");
  };

  const getCartItemsCount = () => {
    return cart.reduce(
      (previousCount, currentItem) => previousCount + currentItem.qty,
      0
    );
  };

  return (
    <CompContainer>
      <TopBar>
        <TopBarText>Welcome to our store!</TopBarText>
      </TopBar>
      <NavMiddleBox>
        <LogoImg onClick={allCategoriesButton} src={logo} />
        <CartButton onClick={accessCart}>
          <AiOutlineShoppingCart style={{ fontSize: "35px" }} />
          <CartButtonText>{`Cart (${getCartItemsCount()})`}</CartButtonText>
        </CartButton>
      </NavMiddleBox>
      <NavMenu>
        <NavLink onClick={allCategoriesButton}>Home</NavLink>
        <NavLink onClick={shopLink}>Shop</NavLink>
        <NavLink onClick={constructionPage}>Sale</NavLink>
        <NavLink onClick={errorPage}>Contact us</NavLink>
        <NavLink onClick={constructionPage}>About us</NavLink>
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
  font-weight: 500;
  &:hover {
    cursor: pointer;
    color: #7900d9;
    transition: 0.3s ease-in;
  }
`;

const LogoImg = styled.img`
  width: auto;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`;

const CartButton = styled.div`
  width: 70px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 1150px;
  &:hover {
    cursor: pointer;
    color: #7900d9;
    transition: 0.3s ease-in;
  }
`;

const CartButtonText = styled.div`
  font-weight: 500;
`;

const CartItemsCount = styled.div`
  font-size: 8px;
  height: 8px;
  display: flex;
  justify-content: center;
  background-color: red;
`;
export default Header;
