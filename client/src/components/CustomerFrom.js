import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
const CustomerForm = ({ cartObjectsArray }) => {
  const { orderId, setOrderId, cart, setCart } = useContext(CartContext);
  const [values, setValues] = useState(null);
  const [inputs, setInputs] = useState(null);
  const navagate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
    // values is just a temperary variable which is holding an object contents inputs
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputs(values);
    if (cart !== "cart" || cart !== []) {
      let objectToBePosted = {
        _id: uuidv4(),
        successfullyCheckoutItems: [],
        failedCheckoutItems: [],
        ...values,
      };
      setOrderId(objectToBePosted._id);
      localStorage.setItem("orderId", `${objectToBePosted._id}`);
      console.log("form content", objectToBePosted);
      const checkEachItem = cartObjectsArray.map(async (item) => {
        const checkEachTime = {
          ...item,
          ...values,
        };
        //   console.log("checkEachTime", checkEachTime);
        try {
          const posting = await fetch(`/verify-for-checkout`, {
            method: "POST",
            body: JSON.stringify(checkEachTime),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const converToJson = await posting.json();
          // window.alert(`${converToJson.message}`);
          console.log("posting", converToJson);
          if (converToJson.status === 200) {
            objectToBePosted.successfullyCheckoutItems.push(item);
          } else {
            objectToBePosted.failedCheckoutItems.push(item);
          }
        } catch (err) {
          console.log(err);
        }
      });

      Promise.all(checkEachItem).then(async () => {
        try {
          const posting = await fetch(`/add-order`, {
            method: "POST",
            body: JSON.stringify(objectToBePosted),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const converToJson = await posting.json();

          navagate(`/confirmation`);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };
  return (
    <FormDiv>
      CUSTOMER'S INFORMATION
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="First Name"
          type="text"
          name="firstName"
          onChange={handleChange}
        />

        <Input
          placeholder="Last Name"
          type="text"
          name="lastName"
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="Address"
          type="address"
          name="address"
          onChange={handleChange}
        />

        <SubmitButton
          type="submit"
          value="Check out!"
          //   disabled={!clickedSeatYet}
          name="confirmButton"
          //   className={!clickedSeatYet ? "disabled" : ""}
        ></SubmitButton>
      </Form>
    </FormDiv>
  );
};
const SubmitButton = styled.input`
  cursor: pointer;
  color: white;
  background-color: blue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin-top: 10px;
  font-family: var("Permanent Marker", Arial, Helvetica, sans-serif);
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;
const Input = styled.input``;

const FormDiv = styled.div`
  border: solid 2px var(--color-alabama-crimson);
  height: fit-content;
`;

export default CustomerForm;
