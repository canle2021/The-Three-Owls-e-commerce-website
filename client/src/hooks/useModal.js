import {useContext} from "react";
import {CartContext} from "../components/CartContext";

const useModal = () => {
  const {isShowing, setIsShowing} = useContext(CartContext);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;