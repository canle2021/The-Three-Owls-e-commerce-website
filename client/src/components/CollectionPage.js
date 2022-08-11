import React, { useEffect, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { FiLoader } from "react-icons/fi";
import ProductCard from "./ProductCard";

const CollectionPage = () => {
  const { singleCategory, setSingleCategory } = useContext(CurrentUserContext);
  const { category } = useParams();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);

    fetch(`/get-items/${category}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSingleCategory(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  }, [category]);
  console.log("data", singleCategory);
  console.log("title", category);
  return !loading ? (
    <>
      <Head1>{category}</Head1>
      <PageContainer>
        {singleCategory.map((element, index) => {
          return (
            // <Link to={`/product/${element._id}`} key={index}>
            <ProductCard
              imageSrc={element.imageSrc}
              pName={element.name}
              pPrice={element.price}
              pStock={element.numInStock}
              pId={element._id}
            />
            // </Link>
          );
        })}
      </PageContainer>
    </>
  ) : (
    <LoaderDiv>
      <FiLoader />
    </LoaderDiv>
  );
};
const Head1 = styled.h1`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 100px;
  margin-top: 20px;
  text-align: center;
`;
const PageContainer = styled.div`
  flex-wrap: wrap;
  gap: 40px 40px;
  width: 1280px;
  display: flex;
  justify-content: center;
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

export default CollectionPage;
