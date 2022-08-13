import React, {
  useState,
  useRef,
  useEffet,
  useEffect,
  useContext,
} from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";

const QuantitySelector = ({ id, qty, setQty, inStock, showStock }) => {
  const minValue = !inStock ? 0 : 1;
  const maxValue = inStock;
  const qtyRef = useRef();
  const { cart, getCartItemQty } = useContext(CartContext);

  useEffect(() => {
    if (qtyRef != undefined && qtyRef.current != undefined)
      qtyRef.current.value = qty;
  }, [qty]);

  const handleMinus = () => {
    const currentQty = parseInt(qtyRef.current.value);

    qtyRef.current.value = currentQty > minValue ? currentQty - 1 : minValue;

    setQty(parseInt(qtyRef.current.value));
  };

  const handlePlus = () => {
    const currentQty = parseInt(qtyRef.current.value);

    qtyRef.current.value = currentQty < maxValue ? currentQty + 1 : maxValue;

    setQty(parseInt(qtyRef.current.value));
  };

  const handleManualInput = () => {
    if (isNaN(-qtyRef.current.value) || parseInt(qtyRef.current.value) < 1) {
      qtyRef.current.value = 1;
    } else if (parseInt(qtyRef.current.value) > maxValue) {
      qtyRef.current.value = maxValue;
    }

    setQty(parseInt(qtyRef.current.value));
  };

  return inStock > 0 ? (
    <>
      <MinusButton disabled={qty <= 1 || !inStock} onClick={handleMinus}>
        -
      </MinusButton>
      <Input disabled={qty === 0} ref={qtyRef} type="text" readOnly={true} />
      <PlusButton
        disabled={qty + getCartItemQty(id) >= maxValue || !inStock}
        onClick={handlePlus}
      >
        +
      </PlusButton>
      {showStock && <ItemsInStock>{`In Stock(${inStock})`}</ItemsInStock>}
    </>
  ) : (
    <>
      <NotAvailable>Not available</NotAvailable>
    </>
  );
};

const MinusButton = styled.button`
  width: 33px;
  height: 33px;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border: none;
  &:disabled {
    opacity: 0.4;
  }
  :hover& {
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  :active& {
    background-color: #7900d9;
    transition: 0s;
  }
`;

const PlusButton = styled.button`
  width: 33px;
  height: 33px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border: none;
  &:disabled {
    opacity: 0.4;
  }
  :hover& {
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  :active& {
    background-color: #7900d9;
    transition: 0s;
  }
`;

const Input = styled.input`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const NotAvailable = styled.div`
  color: red;
  font-weight: bold;
`;

const ItemsInStock = styled.div`
  color: grey;
  margin: 0px 10px;
`;

export default QuantitySelector;
