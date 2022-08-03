"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

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
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some((c) => c.name === collectionName);
  return collectionExists;
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
/*  getCompanies: returns all the companies
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

/**********************************************************/
/*  getSingleProduct:
/**********************************************************/
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

/**********************************************************/
/*  getSingleCustomer: gets a single customer
/**********************************************************/
const getSingleCustomer = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const {_id} = req.params;

  // typeOf _id in each item in DB is a number, this step to transform req params to number for searching purpose.

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the items collection exists
    if (!(await collectionExists(db, "customers"))) {
      return res
        .status(404)
        .json({ status: 404, message: "customers collection does not exist" });
    }

    const retrieveCustomer = await db
    .collection("customers")
    .findOne({_id});

    if (retrieveCustomer) {
      return res.status(200).json({
        status: 200,
        message: `You successfully get information of customer with id: ${_id}`,
        data: retrieveCustomer,
      });
    } 
    else {
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
const customerFields = ["firstname", "lastname", "emal"];

const newCustomer = {_id: uuidv4(), ...body};

try {
  
  await client.connect(); 
  const db = client.db(dbName);

  //check if the fields of the new customer are the right ones
  const bodyFields = Object.keys(body).toArray();
  const fieldsAreRightOnes = await bodyFields.every(field => customerFields.findIndex(field.toLowerCase()) >= 0 );


  if (!fieldsAreRightOnes) {
    return res
     .status(500)
     .json({ status: 500, message: `The fields for a new customer should be ${customerFields}` });
  }

  //insert the reservation
  const insertCustomerResult = await db.collection("customers").insertOne(newCustomer);

  if (insertCustomerResult && insertCustomerResult.acknowledged) {
      return res
        .status(200)
        .json({ status: 200, data: newCustomer, message: "the customer was added successfully" });
  }
  else {
      res.status(500).json({status:500, message: "The customer could not be added properly"});
  }
}
catch(err) {
  console.error(`err = `, err);
  throw err;
}
finally {
  client.close();
}
};

/**********************************************************/
/*  updateItem: updates any or all information of an item
/**********************************************************/
const updateItem = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const body = req.body;
  const {_id, ...rest } = body;

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the items collection exists
    if (!(await collectionExists(db, "items"))) {
      return res
        .status(404)
        .json({ status: 404, message: "items collection does not exist" });
    }

    //check if the _id of the product is provided
    if (!_id) {
      return res
        .status(400)
        .json({ status: 400, message: "The id of item to update is not provided"});
    }

    //check if the item can be updated
    const updateItemResult = await db.collection("items").updateOne({_id}, {$set: {...rest}});

    if (updateItemResult) {
      if (updateItemResult.matchedCount && updateItemResult.modifiedCount) {
        return res
        .status(200)
        .json({status:200, data:body, message: `The item with id: ${_id} was successfully updated.`})
      }
      else if (!updateItemResult.matchedCount) {
        return res
          .status(404)
          .json({status:404, message: `The item with id: ${_id} does not exist`});
      }
      else if (!updateItemResult.modifiedCount) {
        return res
        .status(500)
        .json({status:500, message: `The item with id: ${_id} could not be updated`})
      }
    }
    else {
        return res
        .status(500)
        .json({status:500, message: `The item with id: ${_id} could not be updated`})    
    }
  }
  catch(err) {
    console.error(err);
    throw(err);
  }
  finally {
    client.close();
  }
};

/**********************************************************/
/*  updateItemStock: updates the qty for an item in stock
/**********************************************************/
const updateItemStock = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";
  const {_id, qty: numInStock} = req.params;

  //id from params needs to be converted from string to number for update filter
  const _idToNumber = {
    _id: Number.parseInt(_id),
  };

  console.log(`id: ${_id} qty:${numInStock}`);

  try {
    await client.connect();
    const db = client.db(dbName);

    //check if the items collection exists
    if (!(await collectionExists(db, "items"))) {
      return res
        .status(404)
        .json({ status: 404, message: "items collection does not exist" });
    }

    //check if the _id of the item is provided
    if (!_id) {
      return res
        .status(400)
        .json({ status: 400, message: "The id of the item to update is not provided"});
    }

    //check if the _id of the qty is provided
    if (!numInStock) {
        return res
            .status(400)
            .json({ status: 400, message: "The new quantity in stock is not provided"});
    }

    //check if the item with the provided _id exists
    const updateItemResult = await db.collection("items").updateOne(_idToNumber, {$set: {numInStock: Number.parseInt(numInStock) }});


    if (updateItemResult) {
      if (updateItemResult.matchedCount && updateItemResult.modifiedCount) {
          return res
          .status(200)
          .json({status:200, message: `The item with id: ${_id} was successfully updated to quantity ${numInStock}.`})
      }
      else if (!updateItemResult.matchedCount) {
        return res
          .status(404)
          .json({status:404, message: `The item with id: ${_id} does not exist`});
      }
      else if (!updateItemResult.modifiedCount) {
        return res
          .status(500)
          .json({status:500, message: `New quantity for item with id: ${_id} could not be updated`})
      }
    }
    else {
      return res
        .status(500)
        .json({status:500, message: `New quantity for the item with id: ${_id} could not be updated`})    
    }
  }
  catch(err) {
    console.error(err);
    throw(err);
  }
  finally {
    client.close();
  }
}


module.exports = {
  getItems,
  getCompanies,
  getSingleProduct,
  getSingleCompany,
  getSingleCategory,
  getProductByCompany,
  getCategories,
  getSingleCustomer,
  addCustomer,
  updateItem,
  updateItemStock,
};
