"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**********************************************************/
/*   getCompanies: returns all the companies
/**********************************************************/
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  try {
    // connect...
    await client.connect();
    // declare 'db'
    const db = client.db(dbName);
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
/**********************************************************/
/*  getProductByCompany: 
/**********************************************************/
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
/**********************************************************/
/*  getSingleCompany: 
/**********************************************************/
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

module.exports = { getCompanies, getProductByCompany, getSingleCompany };
