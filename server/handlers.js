"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this data. Changes will persist until the server (backend) restarts.
const companies = require("./data/companies.json");
const items = require("./data/items.json");

const collectionExists = async (db, collectionName) => {
  // const collection = db.collection(collectionName);
  // return !(collection === undefined);

  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((c) => c.name === collectionName);
  return collectionExists;
};

/**********************************************************/
/*  getFlights: returns a list of all flights
/**********************************************************/
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  try {
    // connect...
    await client.connect();
    // declare 'db'
    const db = client.db(dbName);

    // const collections = await db.listCollections().toArray();
    // const collectionExists = collections.some(c => c.name === "items");

    if (!(await collectionExists(db, "items"))) {
      return res
        .status(404)
        .json({ status: 404, message: "items collection does not exist" });
    }

    const itemsArray = await db.collection("items").find().toArray();
    console.log("type of _id", typeof itemsArray[0]._id);
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
/*  getFlights: returns a list of all flights
/**********************************************************/
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  try {
    // connect...
    await client.connect();
    // declare 'db'
    const db = client.db(dbName);

    // const collections = await db.listCollections().toArray();
    // const collectionExists = collections.some(c => c.name === "companies");

    if (!(await collectionExists(db, "companies"))) {
      return res
        .status(404)
        .json({ status: 404, message: "companies collection does not exist" });
    }

    const companiesArray = await db.collection("companies").find().toArray();

    if (companiesArray.length > 0) {
      return res.json({
        companies: companiesArray,
      });
    } else
      res
        .status(404)
        .json({ status: 404, message: "There are no companies available" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const getSingleProduct = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { _id } = req.params;

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
const getProductByCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { companyId } = req.params;
  // we used req.params here but in FE, it should be a filter typing bar where user can input the company'name which will match with companies names list and id
  const _idToNumber = {
    companyId: Number.parseInt(companyId),
  };
  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveProductByCompany = await db
      .collection("items")
      .find(_idToNumber)
      .toArray();

    if (retrieveProductByCompany.length > 0) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get the products with company'id: ${companyId}`,
        data: retrieveProductByCompany,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The product with company'id: ${companyId} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const getSingleCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const { category } = req.params;

  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.
  //  the params must has the same style of category in DB ex: Fitness, not fitness to have the result as expected
  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveCategory = await db
      .collection("items")
      .find({ category })
      .toArray();

    if (retrieveCategory.length > 1) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get the category: ${category}`,
        data: retrieveCategory,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The category: ${category} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const getSingleCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const _id = req.params;
  const _idToNumber = {
    _id: Number.parseInt(_id._id),
  };
  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveProduct = await db
      .collection("companies")
      .findOne(_idToNumber);

    if (retrieveProduct) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get information of Company with id: ${_id._id}`,
        data: retrieveProduct,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `The company with id: ${_id._id} does not exist`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getCompanies,
  getSingleProduct,
  getSingleCompany,
  getSingleCategory,
  getProductByCompany,
};
