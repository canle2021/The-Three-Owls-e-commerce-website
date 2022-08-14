import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
const CustomerForm = ({ cartObjectsArray }) => {
  const { setOrderId, cart } = useContext(CartContext);
  const [values, setValues] = useState(null);
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
    if (cart !== "cart" || cart !== []) {
      let objectToBePosted = {
        _id: uuidv4(),
        successfullyCheckoutItems: [],
        failedCheckoutItems: [],
        ...values,
      };
      setOrderId(objectToBePosted._id);
      localStorage.setItem("orderId", `${objectToBePosted._id}`);
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
          await fetch(`/add-order`, {
            method: "POST",
            body: JSON.stringify(objectToBePosted),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          navagate(`/confirmation`);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  if (cart.length > 0) {
    disabled = false;
  }
  return (
    <FormDiv>
      <Form onSubmit={handleSubmit}>
        <CheckoutTitle>
          <AiOutlineForm style={{ marginRight: "10px", fontSize: "30px" }} />
          Checkout form
        </CheckoutTitle>

        <HeadLine>Customer's information</HeadLine>
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
        <HeadLine2>Address: </HeadLine2>
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
          value="Checkout"
          disabled={disabled}
          name="confirmButton"
          className={disabled ? "disabled" : ""}
        ></SubmitButton>
      </Form>
    </FormDiv>
  );
};

const HeadLine = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const HeadLine2 = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const SubmitButton = styled.input`
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: #30b06b;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 60px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    background-color: #269157;

    transition: 0.5s ease-in-out;
  }
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const CheckoutTitle = styled.h3`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgrey;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 390px;
  height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const FormDiv = styled.div`
  border: solid 2px var(--color-alabama-crimson);
  height: fit-content;
`;

export default CustomerForm;
