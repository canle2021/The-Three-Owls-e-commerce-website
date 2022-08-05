import React, { useState, useEffect } from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [allCateogries, setAllCategories] = useState();

  // Get all cateory----------------------------
  useEffect(() => {
    fetch("/get-categories")
      .then((res) => res.json())
      .then((data) => setAllCategories(data.data));
  }, []);
  // ----------------------------

  return (
    <CurrentUserContext.Provider
      value={{
        allCateogries,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
