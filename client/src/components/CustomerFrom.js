import React, { useState } from "react";
import styled from "styled-components";

const CustomerForm = ({ cartObjectsArray }) => {
  const [values, setValues] = useState();
  const [inputs, setInputs] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
    // values is just a temperary variable which is holding an object contents inputs
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setInputs(values);
    const objectToBePosted = {
      checkoutItems: cartObjectsArray,
      ...values,
    };
    console.log("form content", objectToBePosted);
  };
  return (
    <FormDiv>
      This is for the customer's information form
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
          value="Confirm"
          name="confirmButton"
        ></SubmitButton>
      </Form>
    </FormDiv>
  );
};
const SubmitButton = styled.input`
  font-family: var(--font-heading);
  background-color: var(--color-alabama-crimson);
  color: black;
  cursor: pointer;
  font-family: "Permanent Marker", Arial, Helvetica, sans-serif;
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
