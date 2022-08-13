import React, { useContext, useEffect, useState } from "react";

import styled, { keyframes } from "styled-components";
import { CartContext } from "./CartContext";
import { FiLoader } from "react-icons/fi";
import ErrorPage from "./ErrorPage.js";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const Confirmation = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const [confirmOrderObject, setConfirmOrderObject] = useState([]);
  const { orderId, setOrderId, setCart, setCartTotal } =
    useContext(CartContext);
  const [notCheckedOutItems, setNotCheckedOutItems] = useState([]);
  const [checkedOutItems, setCheckedOutItems] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(`/get-single-order/${orderId}`)
      .then((res) => {
        console.log("res", res);
        setError(res.ok);
        return res.json();
      })
      .then((data) => {
        setConfirmOrderObject(data.data || []);
        console.log("line 24 confirmOrderObject", confirmOrderObject);
        setCheckedOutItems(data.data.successfullyCheckoutItems);
        setNotCheckedOutItems(data.data.failedCheckoutItems);
      })

      .then(() => {
        setCart([]);
        setCartTotal(0);
        setLoading(false);
      })

      .catch((err) => {
        console.log("err", err);
      });
  }, [orderId]);
  let totalPrice = 0;
  console.log("checkedOutItems", checkedOutItems);

  console.log(
    "CheckedoutItems",
    confirmOrderObject && confirmOrderObject.successfullyCheckoutItems
  );
  checkedOutItems &&
    checkedOutItems.forEach((element) => {
      totalPrice += Number(element.price) * Number(element.qty);
    });
  return !loading ? (
    <>
      {error ? (
        <>
          <CartPageDiv>
            <PageContainer>
              {checkedOutItems && checkedOutItems.length > 0 ? (
                <SuccessfulCheckoutDiv>
                  <PageTitle>
                    <BsFillCheckCircleFill
                      style={{ color: "#30b06b", marginRight: "10px" }}
                    />
                    Successfully purchased
                  </PageTitle>

                  <CustomerInformation>
                    <OrderNumberP>Order number: {orderId}</OrderNumberP>
                    <p>
                      Name: {confirmOrderObject.firstName}{" "}
                      {confirmOrderObject.lastName}
                    </p>
                    <p>Email: {confirmOrderObject.email}</p>
                    <p>
                      Address: {confirmOrderObject.houseNumber}{" "}
                      {confirmOrderObject.street} {confirmOrderObject.province}{" "}
                      {confirmOrderObject.postalCode}{" "}
                      {confirmOrderObject.country}
                    </p>
                  </CustomerInformation>
                  <CartItems>
                    {checkedOutItems &&
                      checkedOutItems.map((item, index) => {
                        return (
                          <EachProduct key={index}>
                            <p>Product's name: {item.name}</p>
                            <p>Product's ID: {item._id}</p>
                            <p>Required quantity: {item.qty}</p>
                            <p>Unit price: ${item.price}</p>
                          </EachProduct>
                        );
                      })}
                  </CartItems>
                  <CartTotal>
                    <TotalAmount>
                      {" "}
                      {`Total Order's Price: $ ${totalPrice}`}
                    </TotalAmount>
                  </CartTotal>
                </SuccessfulCheckoutDiv>
              ) : null}
              {notCheckedOutItems && notCheckedOutItems.length > 0 ? (
                <NotSuccessfulCheckoutDiv>
                  {/* -------REPLACE----------- */}
                  {/* <NotCheckOutTitle>Not be checked out items</NotCheckOutTitle> */}
                  <PageTitle>
                    <BsXCircleFill
                      style={{ color: "#30b06b", marginRight: "10px" }}
                    />
                    purchase is not successful
                  </PageTitle>
                  {/* ---------------------- */}
                  <ExplainationP>
                    Due to out-of-stock/not-enough-stock for your required
                    quantity or some other reasons. We apologize for the items
                    that you could not check out:
                  </ExplainationP>
                  {checkedOutItems && checkedOutItems.length > 0 ? null : (
                    <CustomerInformation>
                      <OrderNumberP>Order number: {orderId}</OrderNumberP>

                      <p>
                        Customer's name: {confirmOrderObject.firstName}{" "}
                        {confirmOrderObject.lastName}
                      </p>
                      <p>Customer's email: {confirmOrderObject.email}</p>
                      <p>Customer's address: {confirmOrderObject.address}</p>
                    </CustomerInformation>
                  )}
                  <CartItems>
                    {notCheckedOutItems &&
                      notCheckedOutItems.map((item, index) => {
                        return (
                          <EachProduct key={index}>
                            <p>Product's name: {item.name}</p>
                            <p>Product's ID: {item._id}</p>
                            <p>Required quantity: {item.qty}</p>
                            <p>Unit Price: ${item.price}</p>
                          </EachProduct>
                        );
                      })}
                  </CartItems>
                </NotSuccessfulCheckoutDiv>
              ) : null}
            </PageContainer>
          </CartPageDiv>
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  ) : (
    <LoaderDiv>
      <FiLoader />
    </LoaderDiv>
  );
};
const ExplainationP = styled.p`
  border-bottom: 2px solid red;
`;
const NotSuccessfulCheckoutDiv = styled.div``;
const SuccessfulCheckoutDiv = styled.div``;
const OrderNumberP = styled.p``;
const EachProduct = styled.div``;
const CustomerInformation = styled.div`
  border-bottom: solid 1px lightgrey;
  padding-bottom: 20px;
  margin-bottom: 20px;
  line-height: 32px;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const CartPageDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoaderDiv = styled.div`
  font-size: 50px;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${rotate} infinite 4s linear;
`;

const PageContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const PageTitle = styled.div`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  width: 100%;
`;
const NotCheckOutTitle = styled.div`
  font-size: 35px;
  color: red;
  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 10px;
`;

const CartItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgrey;
  line-height: 32px;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalAmount = styled.div`
  font-weight: bold;
`;

const CheckoutSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CheckoutButton = styled.button`
  color: white;
  background-color: blue;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin-top: 10px;
`;

export default Confirmation;
