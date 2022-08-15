import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProductCard from "./ProductCard";
import { FiLoader } from "react-icons/fi";
const ProductSection = () => {
  const [loading, setLoading] = useState(true);
  const [allItem, setAllItem] = useState();
  useEffect(() => {
    fetch("/get-items")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAllItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const sliceItem =
    allItem &&
    allItem["items"].slice(
      allItem["items"].length - 4,
      allItem["items"].length
    );
  if (loading) {
    return (
      <LoaderDiv>
        <FiLoader />
      </LoaderDiv>
    );
  } else {
    return (
      <CompContainer>
        {sliceItem &&
          sliceItem.reverse().map((items) => {
            return (
              <ProductCard
                key={items._id}
                pName={items.name}
                pPrice={items.price}
                imageSrc={items.imageSrc}
                pStock={items.numInStock}
                pId={items._id}
              />
            );
          })}
      </CompContainer>
    );
  }
};

const CompContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 250px;
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
export default ProductSection;
