"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**********************************************************/
/*  getItems: returns all the items
/**********************************************************/
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  try {
    // connect...
    await client.connect();
    // declare 'db'
    const db = client.db(dbName);

    const itemsArray = await db.collection("items").find().toArray();

    if (itemsArray.length > 0) {
      return res.json({
        items: itemsArray,
      });
    } else
      res
        .status(404)
        .json({ status: 404, message: "There are no items available" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
/**********************************************************/
/*  getSingleProduct:
/**********************************************************/
const getSingleProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id } = req.params;
  console.log("id", _id);

  const _idToNumber = {
    _id: Number.parseInt(_id),
  };
  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveProduct = await db.collection("items").findOne(_idToNumber);

    if (retrieveProduct) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get the product with id: ${_id}`,
        data: retrieveProduct,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The product with id: ${_id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

/**********************************************************/
/*  getItemStock: get quantity of an item in stock
/**********************************************************/
const getItemStock = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id } = req.params;

  const _idToNumber = {
    _id: Number.parseInt(_id),
  };

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrievedItem = await db.collection("items").findOne(_idToNumber);

    if (retrievedItem) {
      return res.status(200).json({
        status: 200,
        data: { numInStock: retrievedItem.numInStock },
        message: `Item  with id:${_id} has a quantity of ${retrievedItem.numInStock} in stock`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The item with id:${_id} cannot be found.`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
/**********************************************************/
/*  updateItem: updates any or all information of an item
/**********************************************************/
const updateItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const body = req.body;
  const { _id, ...rest } = body;

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the _id of the product is provided
    if (!_id) {
      return res.status(400).json({
        status: 400,
        message: "The id of item to update is not provided",
      });
    }

    //check if the item can be updated
    const updateItemResult = await db
      .collection("items")
      .updateOne({ _id }, { $set: { ...rest } });

    if (updateItemResult) {
      if (updateItemResult.matchedCount && updateItemResult.modifiedCount) {
        return res.status(200).json({
          status: 200,
          data: body,
          message: `The item with id: ${_id} was successfully updated.`,
        });
      } else if (!updateItemResult.matchedCount) {
        return res.status(404).json({
          status: 404,
          message: `The item with id: ${_id} does not exist`,
        });
      } else if (!updateItemResult.modifiedCount) {
        return res.status(500).json({
          status: 500,
          message: `The item with id: ${_id} could not be updated`,
        });
      }
    } else {
      return res.status(500).json({
        status: 500,
        message: `The item with id: ${_id} could not be updated`,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.close();
  }
};

/**********************************************************/
/*  updateItemStock: updates the qty for an item in stock
/**********************************************************/
const updateItemStock = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id, qty: numInStock } = req.params;

  //id from params needs to be converted from string to number for update filter
  const _idToNumber = {
    _id: Number.parseInt(_id),
  };

  console.log(`id: ${_id} qty:${numInStock}`);

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the _id of the item is provided
    if (!_id) {
      return res.status(400).json({
        status: 400,
        message: "The id of the item to update is not provided",
      });
    }

    //check if the _id of the qty is provided
    if (!numInStock) {
      return res.status(400).json({
        status: 400,
        message: "The new quantity in stock is not provided",
      });
    }

    //check if the item with the provided _id exists
    const updateItemResult = await db
      .collection("items")
      .updateOne(_idToNumber, {
        $set: { numInStock: Number.parseInt(numInStock) },
      });

    if (updateItemResult) {
      if (updateItemResult.matchedCount && updateItemResult.modifiedCount) {
        return res.status(200).json({
          status: 200,
          message: `The item with id: ${_id} was successfully updated to quantity ${numInStock}.`,
        });
      } else if (!updateItemResult.matchedCount) {
        return res.status(404).json({
          status: 404,
          message: `The item with id: ${_id} does not exist`,
        });
      } else if (!updateItemResult.modifiedCount) {
        return res.status(500).json({
          status: 500,
          message: `New quantity for item with id: ${_id} could not be updated`,
        });
      }
    } else {
      return res.status(500).json({
        status: 500,
        message: `New quantity for the item with id: ${_id} could not be updated`,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getSingleProduct,
  getItemStock,
  updateItem,
  updateItemStock,
};
