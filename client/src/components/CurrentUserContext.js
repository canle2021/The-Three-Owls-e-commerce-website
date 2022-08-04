import React, { useState, useEffect } from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const testingPurpose =
    "Hello, this for tesing purpose, if you that in console.log Homepage, that means it works!, You context now!";
  return (
    <CurrentUserContext.Provider
      value={{
        testingPurpose,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
