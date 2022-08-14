"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**********************************************************/
/*  getSingleCategory: 
/**********************************************************/
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

    if (retrieveCategory.length > 0) {
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
/**********************************************************/
/*  getCategories: 
/**********************************************************/
const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    const retrieveCategories = await db
      .collection("items")
      .find()
      .project({ category: 1, _id: 0 })
      .toArray();

    if (retrieveCategories.length > 0) {
      let categoriesRepeated = [];
      retrieveCategories.forEach((element) => {
        categoriesRepeated.push(element.category);
      });
      const categoriesArray = [...new Set(categoriesRepeated)];

      return res.status(200).json({
        status: 200,
        message: `You successfully get all the categories`,
        data: categoriesArray,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `Categories could not be found`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getSingleCategory, getCategories };
