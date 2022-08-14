"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**********************************************************/
/*  getSingleCustomer: gets a single customer
/**********************************************************/
const getSingleCustomer = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id } = req.params;

  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the items collection exists

    const retrieveCustomer = await db.collection("customers").findOne({ _id });

    if (retrieveCustomer) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get information of customer with id: ${_id}`,
        data: retrieveCustomer,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The customer with id: ${_id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

/**********************************************************/
/*  addCustomer:  creates a new customer
/**********************************************************/
const addCustomer = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const body = req.body;
  const customerFields = ["firstname", "lastname", "email"];

  const newCustomer = { _id: uuidv4(), ...body };

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the fields of the new customer are the right ones
    const bodyFields = Object.keys(body);

    const fieldsAreRightOnes = bodyFields.every(
      (field) => customerFields.indexOf(field) >= 0
    );

    if (!fieldsAreRightOnes) {
      return res.status(500).json({
        status: 500,
        message: `The fields for a new customer should be: ${customerFields}`,
      });
    }

    const insertCustomerResult = await db
      .collection("customers")
      .insertOne(newCustomer);

    if (insertCustomerResult && insertCustomerResult.acknowledged) {
      return res.status(200).json({
        status: 200,
        data: newCustomer,
        message: "the customer was added successfully",
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "The customer could not be added properly",
      });
    }
  } catch (err) {
    console.error(`err = `, err);
    throw err;
  } finally {
    client.close();
  }
};

module.exports = { getSingleCustomer, addCustomer };
