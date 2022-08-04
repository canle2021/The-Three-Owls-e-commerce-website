import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const HomePage = () => {
  const { testingPurpose } = useContext(CurrentUserContext);
  console.log(testingPurpose);
  return (
    <PageContainer>
      <p>This is homepage!</p>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
`;

export default HomePage;
