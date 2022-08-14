/* eslint-disable */
import React, { useEffect, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { CartContext } from "./CartContext";
import { FiLoader } from "react-icons/fi";
import QuantitySelector from "./QuantitySelector";
import useModal from "../hooks/useModal";


const ProductDetail = () => {
  const { singleProduct, setSingleProduct } = useContext(CurrentUserContext);
  const { cart, setCart, getCartItemQty } = useContext(CartContext);
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [qty, setQty] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const {toggle} = useModal();
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);

    fetch(`/get-item/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product does not exist");
        }  
        return res.json();
      })
      .then((data) => {
        setSingleProduct(data.data || []);
  
        fetch(`/get-company/${data.data.companyId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Company does not exist");
          }  
          return res.json();
        })
        .then((data) => {
          setCompanyName(data.data.name || "");
          setCompanyUrl(data.data.url);
        })
        .catch((err) => {
          console.log("err", err);
          navigate("/error");
        })
        .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.log("err", err);
        navigate("/error");
      })
  }, [id]);

  const addToCart = () => {
    const newItem = { id, qty };

    //check if the product is already in the list
    const alreadyInCart = cart.some((cartItem) => cartItem.id === id);

    if (!alreadyInCart) {
      setCart([...cart, newItem]);
    } else {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.qty += newItem.qty;
          cartItem.key = id;
          return cartItem;
        } else {
          return cartItem;
        }
      });
      setCart(newCart);
    }
    setQty(1);
    toggle();
  };

  return !loading ? (
    <>
      <PageContainer>
        <ProductImg imageSrc={singleProduct.imageSrc} />
        <ProductInformation>
          <ProductCategory><Link href={companyUrl} target="_blank">{`${companyName}`}</Link> {` | ${singleProduct.category}`}</ProductCategory>
          <ProductName>{singleProduct.name}</ProductName>
          <ProductPrice>{singleProduct.price}</ProductPrice>
          <ProductQty>
            {(singleProduct.numInStock <= 0 ||
              (singleProduct.numInStock > 0 &&
                getCartItemQty(singleProduct._id) <
                  singleProduct.numInStock)) && (
              <QuantitySelect
                id={parseInt(singleProduct._id)}
                qty={qty}
                setQty={setQty}
                inStock={singleProduct.numInStock}
                showStock={false}
              />
            )}
            {singleProduct.numInStock > 0 && (
              <QuantityInStock>{`In Stock(${singleProduct.numInStock})`}</QuantityInStock>
            )}
            {getCartItemQty(singleProduct._id) > 0 && (
              <QuantityInCart>{`In Cart(${getCartItemQty(
                singleProduct._id
              )})`}</QuantityInCart>
            )}
          </ProductQty>
          <AddToCartButton
            disabled={
              !singleProduct.numInStock ||
              getCartItemQty(singleProduct._id) >= singleProduct.numInStock
            }
            onClick={addToCart}
          >
            Add to cart
          </AddToCartButton>
        </ProductInformation>
      </PageContainer>
    </>
  ) : (
    <LoaderDiv>
      <FiLoader />
    </LoaderDiv>
  );
};
const ProductInformation = styled.div`
  flex-direction: column;
  width: 600px;
`;
const ProductName = styled.h3`
  font-family: "Roboto";
  font-size: 25px;
  line-height: 35px;
  font-weight: 600;
`;
const ProductCategory = styled.p`
  text-transform: uppercase;
  letter-spacing: 2px;
  color: gray;
  margin-bottom: 10px;
`;
const ProductPrice = styled.p`
  font-size: 25px;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  font-weight: 400;
  color: #7900d9;
`;

const ProductQty = styled.div`
  display: flex;
  padding: 5px 0px;
`;

const QuantityInStock = styled.div`
  color: grey;
  margin-right: 10px;
`;

const QuantityInCart = styled.div`
  color: grey;
`;

const PageContainer = styled.div`
  width: 1280px;
  display: flex;
  justify-content: space-between;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderDiv = styled.div`
  font-size: 50px;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${rotate} infinite 4s linear;
`;

const AddToCartButton = styled.button`
  width: 320px;
  height: 70px;
  margin: 40px 0px;
  font-size: 20px;
  font-weight: 600;
  background-color: #7900d9;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: none;
  &:disabled {
    opacity: 0.4;
  }
  :hover& {
    cursor: pointer;
    background-color: black;
    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 2px;
    transition: 0.5s ease-in-out;
  }
`;

const QuantitySelect = styled(QuantitySelector)`
  margin-right: 10px;
  display: inline;
`;

const ProductImg = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  background-color: white;
  background-image: url(${(props) => props.imageSrc});
  background-repeat: no-repeat;
  background-position: center;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: black;
`;

export default ProductDetail;
