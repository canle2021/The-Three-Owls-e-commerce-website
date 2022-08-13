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
  let disabled = true;
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
      console.log("Post", objectToBePosted);
    }
  };
  console.log("cartObjectsArray", cart);
  if (cart.length > 0) {
    disabled = false;
  }
  return (
    <FormDiv>
      <Form onSubmit={handleSubmit}>
        <HeadLine>CUSTOMER'S INFORMATION</HeadLine>
        <Input
          placeholder="First Name"
          type="text"
          name="firstName"
          required
          onChange={handleChange}
        />

        <Input
          placeholder="Last Name"
          type="text"
          name="lastName"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <CustomerAddress>Address: </CustomerAddress>
        <Input
          placeholder="House Number"
          type="text"
          name="houseNumber"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="Street"
          type="text"
          name="street"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="City"
          type="text"
          name="city"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="Province"
          type="text"
          name="province"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="Postal code"
          type="text"
          name="postalCode"
          required
          onChange={handleChange}
        />
        <Input
          placeholder="Country"
          type="text"
          name="country"
          onChange={handleChange}
          required
        />

        <SubmitButton
          type="submit"
          value="Check out!"
          disabled={disabled}
          name="confirmButton"
          className={disabled ? "disabled" : ""}
        ></SubmitButton>
      </Form>
    </FormDiv>
  );
};
const CustomerAddress = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 7px;
`;
const HeadLine = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;
const SubmitButton = styled.input`
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  background-color: blue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
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
const Input = styled.input`
  width: 400px;
  height: 25px;
  margin-bottom: 10px;
`;

const FormDiv = styled.div`
  border: solid 2px var(--color-alabama-crimson);
  height: fit-content;
`;

export default CustomerForm;
