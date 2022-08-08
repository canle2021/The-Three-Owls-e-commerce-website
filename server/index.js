"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getItems,
  getCompanies,
  getSingleProduct,
  getSingleCompany,
  getSingleCategory,
  getProductByCompany,
  getCategories,
  getSingleCustomer,
  getItemStock,
  addCustomer,
  updateItem,
  updateItemStock,
  checkOut,
  getOrders,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    // console.log("this is the test");
    // console.log("HELLO CANNN!");
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))
  .get("/get-items", getItems)
  .get("/get-companies", getCompanies)
  .get("/get-item/:_id", getSingleProduct)
  .get("/get-company/:_id", getSingleCompany)
  .get("/get-items/:category", getSingleCategory)
  .get("/get-itemsByCompany/:companyId", getProductByCompany)
  .get("/get-categories", getCategories)
  .get("/get-customer/:_id", getSingleCustomer)
  .get("/get-item-stock/:_id", getItemStock)
  .get("/get-orders", getOrders)
  .post("/add-customer", addCustomer)
  .patch("/update-item", updateItem)
  .patch("/update-item/:_id/stock/:qty", updateItemStock)
  .post("/add-order-and-checkout", checkOut)
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })
  .listen(PORT, () => console.info(`LISTENING ON PORT ${PORT}`));
