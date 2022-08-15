"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
/**********************************************************/
/*  checkOut: check Out process
/**********************************************************/

const checkOut = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const body = req.body;

  // supposed the posting method wil have a req.body with this format: {
  //
  //   "category": "Entertainment"
  // _id: "6875",
  // name: "Monoprice 110161 MHD Action Camera Helmet Mount",
  // price: "13.39",
  // qty: 1,
  //
  // 	"firstName": "Antonio",
  // 	"lastName": "Free",
  // 	"email": "Antonio@bFree.com"
  // 	"address": "134 IO street ... "
  // }
  if (
    !body.category ||
    !body._id ||
    !body.name ||
    !body.qty ||
    !body.price ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.houseNumber ||
    !body.street ||
    !body.city ||
    !body.province ||
    !body.postalCode ||
    !body.country
  ) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }
  if (!body.email.includes("@")) {
    return res.status(400).json({
      status: 400,
      data: {},
      message:
        "Sorry. Please provide the correct form of email address(including @)",
    });
  }

  // console.log("line 667", newOrder);
  // Number.parseInt(body.qty)
  try {
    await client.connect();
    const db = client.db(dbName);
    // let newOrder = {
    //   _id: uuidv4(),
    //   itemsFinished: [],
    //   itemUnsuccessedCheckout: [],
    //   firstName: body.firstName,
    //   lastName: body.lastName,
    //   email: body.email,
    //   houseNumber:houseNumber  ,
    //   street :street,
    //   province :province,
    //   postalCode: postalCode,
    //   country:country,
    // };

    // use map method from here

    const idToNumber = Number.parseInt(body._id);
    const quantityToNumber = Number.parseInt(body.qty);
    // transform string in req.body to number because the DB has number type

    const findItem = await db.collection("items").findOne({ _id: idToNumber });
    //
    if (findItem) {
      if (findItem.numInStock < 1 || findItem.numInStock < quantityToNumber) {
        // check enough stock or not
        return res.status(400).json({
          status: 400,
          message: ` Sorry, we ran out of stock or not enough stock for the product with id: ${idToNumber}/name: ${findItem.name} at this time`,
        });
      } else {
        try {
          const updateStockNumber = await db.collection("items").updateOne(
            {
              _id: idToNumber,
            },
            { $set: { numInStock: findItem.numInStock - quantityToNumber } }
          );

          if (updateStockNumber.modifiedCount > 0) {
            //  this is to make sure the stock number was updated successfully

            return res.status(200).json({
              status: 200,
              data: {
                ...body,
              },
              message: ` Congratulations, product with id: ${idToNumber} /name: ${findItem.name} was successfully checked out`,
            });
          } else {
            return res.status(500).json({
              status: 500,

              message: ` Sorry, product with id: ${idToNumber} /name: ${findItem.name} was NOT successfully checked out for some reason`,
            });
          }
        } catch (err) {
          console.log("err from adjusting stock number/Checkout endPoint", err);
        }
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: `The product with id: ${idToNumber} does not exist`,
      });
    }
  } catch (err) {
    console.log("err from checkOut endpoint", err);
    //
  }
  client.close();
};

/**********************************************************/
/*  addOrder:  creates a Orders
/**********************************************************/
const addOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const body = req.body;

  if (
    !body._id ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.houseNumber ||
    !body.street ||
    !body.city ||
    !body.province ||
    !body.postalCode ||
    !body.country
  ) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }
  try {
    await client.connect();

    const db = client.db(dbName);

    const insertNewOrder = await db.collection("Orders").insertOne(body);

    if (insertNewOrder.insertedId !== "") {
      //  this is to make sure the <Order> collection was updated successfully

      return res.status(200).json({
        status: 200,
        message: ` The order with id: ${body._id} was successfully added`,
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: ` Sorry, The order with id: ${body._id} was NOT successfully added for some reason`,
      });
    }
  } catch (err) {
    console.log();
    "err from add new Order to <Orders> collection", err;
  }

  client.close();
};
/**********************************************************/
/*  get Single Order
/**********************************************************/
const getSingleOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id } = req.params;

  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveProduct = await db.collection("Orders").findOne({ _id });

    if (retrieveProduct) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get the order with id: ${_id}`,
        data: retrieveProduct,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The order with id: ${_id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
module.exports = {
  checkOut,
  addOrder,
  getSingleOrder,
};
