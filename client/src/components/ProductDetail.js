import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const ProductDetail = () => {
  const { singleProduct, setSingleProduct } = useContext(CurrentUserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/get-item/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSingleProduct(data.data || []);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);
  // console.log("data", singleProduct);

  return (
    <>
      <PageContainer>
        <img src={singleProduct.imageSrc} />
        <ProductInformation>
          <ProductName>{singleProduct.name}</ProductName>
          <ProductCategory>{singleProduct.category}</ProductCategory>
          <ProductPrice>{singleProduct.price}</ProductPrice>
        </ProductInformation>
      </PageContainer>
    </>
  );
};
const ProductInformation = styled.div``;
const ProductName = styled.p``;
const ProductCategory = styled.p``;
const ProductPrice = styled.p``;

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default ProductDetail;
