import React from "react";
import styled from "styled-components";

const CollectionPage = () => {
  return (
    <>
      <PageContainer>
        <p>This is CollectionPage</p>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default CollectionPage;
