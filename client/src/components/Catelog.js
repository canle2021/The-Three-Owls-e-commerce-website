import React from "react";
import styled from "styled-components";

const Catelog = () => {
  return (
    <PageContainer>
      <p>This is catalog!</p>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default Catelog;
