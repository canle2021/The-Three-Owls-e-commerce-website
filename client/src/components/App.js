import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import Catelog from "./Catelog";
import CollectionPage from "./CollectionPage";
import ProductDetail from "./ProductDetail";
import AddToCart from "./AddToCart";
import Footer from "./Footer";
import logo from "../components/asset/3Owls.png";
import Confirmation from "./Confirmation";
import ErrorPage from "./ErrorPage";
import ConstructionPage from "./ConstructionPage";
import ModalAddedToCart from "./ModalAddedToCart";
import useModal from "../hooks/useModal";
import './app.css';

function App() {
  const {isShowing, toggle} = useModal();
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
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </SizeContainer>
      <div className="App">
        <ModalAddedToCart
          isShowing={isShowing}
          hide={toggle}
          message="Added to the cart"
        />
      </div>
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
