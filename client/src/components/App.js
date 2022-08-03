import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import FeaturedCategories from "./FeaturedCategories";
import Slider from "./Slider";
import ProductSection from "./ProductSection";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <SizeContainer>
      <Header />
      <Slider />
      <SectionTitle>Featured Categories</SectionTitle>
      <FeaturedCategories />
      <SectionTitle>Product Section</SectionTitle>
      <ProductSection />
    </SizeContainer>
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
