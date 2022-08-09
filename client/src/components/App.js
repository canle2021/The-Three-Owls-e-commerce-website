import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import Catelog from "./Catelog";
import CollectionPage from "./CollectionPage";
import ProductDetail from "./ProductDetail";
import AddToCart from "./AddToCart";
import Footer from "./Footer";
import logo from "../components/asset/logo.png";
import Confirmation from "./Confirmation";
function App() {
  return (
    <Router>
      <SizeContainer>
        <Header logo={logo} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catelog />} />
          <Route path="/collection/:category" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
        <Footer />
      </SizeContainer>
    </Router>
  );
}

const SizeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
