import React from "react";
import styled from "styled-components";

const AddToCart = () => {
  return (
    <>
      <PageContainer>
        <p>This is cart!!</p>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default AddToCart;
