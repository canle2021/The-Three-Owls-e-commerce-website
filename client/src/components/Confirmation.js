/* eslint-disable*/

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
  const { orderId, setCart, setCartTotal } = useContext(CartContext);
  const [notCheckedOutItems, setNotCheckedOutItems] = useState([]);
  const [checkedOutItems, setCheckedOutItems] = useState();
  useEffect(() => {
    setLoading(true);
    fetch(`/get-single-order/${orderId}`)
      .then((res) => {
        setError(res.ok);
        return res.json();
      })
      .then((data) => {
        setConfirmOrderObject(data.data || []);
        setCheckedOutItems(data.data.successfullyCheckoutItems || []);
        setNotCheckedOutItems(data.data.failedCheckoutItems || []);
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
                    <OrderNumberP>
                      {" "}
                      <Strong>Order number:</Strong> {orderId}
                    </OrderNumberP>
                    <p>
                      <Strong>Name:</Strong> {confirmOrderObject.firstName}{" "}
                      {confirmOrderObject.lastName}
                    </p>
                    <p>
                      <Strong>Email:</Strong> {confirmOrderObject.email}
                    </p>
                    <p>
                      <Strong>Address:</Strong> {confirmOrderObject.houseNumber}{" "}
                      {confirmOrderObject.street} {confirmOrderObject.city}{" "}
                      {confirmOrderObject.province}{" "}
                      {confirmOrderObject.postalCode}{" "}
                      {confirmOrderObject.country}
                    </p>
                  </CustomerInformation>
                  <CartItems>
                    {checkedOutItems &&
                      checkedOutItems.map((item, index) => {
                        return (
                          <EachProduct key={index}>
                            <p>
                              <Strong>Product's name:</Strong> {item.name}
                            </p>
                            <p>
                              <Strong>Product's ID:</Strong> {item._id}
                            </p>
                            <p>
                              <Strong>Required quantity:</Strong> {item.qty}
                            </p>
                            <p>
                              <Strong>Unit price:</Strong> ${item.price}
                            </p>
                          </EachProduct>
                        );
                      })}
                  </CartItems>
                  <CartTotal>
                    <TotalAmount>
                      {" "}
                      {`Total Order's Price: $${totalPrice.toFixed(2)}`}
                    </TotalAmount>
                  </CartTotal>
                </SuccessfulCheckoutDiv>
              ) : null}
              {notCheckedOutItems && notCheckedOutItems.length > 0 ? (
                <NotSuccessfulCheckoutDiv>
                  <PageTitle>
                    <BsXCircleFill
                      style={{ color: "#e63629", marginRight: "10px" }}
                    />
                    purchase is not successful
                  </PageTitle>
                  <ProblemBox>
                    <ExplainationP>
                      Due to out-of-stock/not-enough-stock for your required
                      quantity or some other reasons. We apologize for the items
                      that you could not check out.
                    </ExplainationP>
                  </ProblemBox>
                  {checkedOutItems && checkedOutItems.length > 0 ? null : (
                    <CustomerInformation>
                      <OrderNumberP>
                        <Strong>Order number:</Strong> {orderId}
                      </OrderNumberP>

                      <p>
                        <Strong>Name:</Strong> {confirmOrderObject.firstName}{" "}
                        {confirmOrderObject.lastName}
                      </p>
                      <p>
                        <Strong>Email:</Strong> {confirmOrderObject.email}
                      </p>
                      <p>
                        <Strong>Address:</Strong>{" "}
                        {confirmOrderObject.houseNumber}{" "}
                        {confirmOrderObject.street} {confirmOrderObject.city}{" "}
                        {confirmOrderObject.province}{" "}
                        {confirmOrderObject.postalCode}{" "}
                        {confirmOrderObject.country}
                      </p>
                    </CustomerInformation>
                  )}
                  <CartItems>
                    {notCheckedOutItems &&
                      notCheckedOutItems.map((item, index) => {
                        return (
                          <EachProduct key={index}>
                            <p>
                              <Strong>Product's name:</Strong> {item.name}
                            </p>
                            <p>
                              <Strong>Product's ID:</Strong> {item._id}
                            </p>
                            <p>
                              <Strong>Required quantity:</Strong> {item.qty}
                            </p>
                            <p>
                              <Strong>Unit Price:</Strong> ${item.price}
                            </p>
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

const ProblemBox = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  border: 2px solid #e63629;
  border-radius: 10px;
  background-color: #ffe2e0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Strong = styled.span`
  font-weight: 500;
`;
const ExplainationP = styled.p`
  text-align: center;
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
  margin-top: 10px;
  font-size: 25px;
  font-weight: bold;
`;

export default Confirmation;
