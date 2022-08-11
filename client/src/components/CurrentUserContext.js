import React, { useState, useEffect } from "react";
export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [allCateogries, setAllCategories] = useState();
  const [singleCategory, setSingleCategory] = useState([]);
  const [singleProduct, setSingleProduct] = useState("");

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
        singleCategory,
        setSingleCategory,
        singleProduct,
        setSingleProduct,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
