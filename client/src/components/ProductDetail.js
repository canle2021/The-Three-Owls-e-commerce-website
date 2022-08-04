import React from "react";
import styled from "styled-components";

const ProductDetail = () => {
  return (
    <>
      <PageContainer>
        <p>This is product details</p>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default ProductDetail;
