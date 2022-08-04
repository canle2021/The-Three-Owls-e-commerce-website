import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import Catelog from "./Catelog";
import CollectionPage from "./CollectionPage";
import ProductDetail from "./ProductDetail";
import AddToCart from "./AddToCart";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <Router>
      <SizeContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catelog />} />
          <Route path="/collection/:category" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<AddToCart />} />
        </Routes>
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

const SectionTitle = styled.h2`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 50px;
  margin-top: 50px;
`;
export default App;
