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
const  companies = require("./data/companies.json");
const items = require("./data/items.json");


const collectionExists = async (db, collectionName) => {

    // const collection = db.collection(collectionName);
    // return !(collection === undefined);

    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(c => c.name === collectionName);
    return collectionExists;
}

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

        if (! await collectionExists(db, "items")) {
            return res.status(404).json({status:404, message:'items collection does not exist'});
        }

        const itemsArray = await db.collection("items").find().toArray();

        if (itemsArray.length > 0) {

            return res.json({
                items: itemsArray,
                });
        }
        else
            res.status(404).json({status:404, message:"There are no items available"});
    }
    catch(err) {
        res.status(500).json({status:500, message: err.message});
    }
    finally {
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

        if (! await collectionExists(db, "companies")) {
            return res.status(404).json({status:404, message:'companies collection does not exist'});
        }

        const companiesArray = await db.collection("companies").find().toArray();

        if (companiesArray.length > 0) {

            return res.json({
                companies: companiesArray,
                });
        }
        else
            res.status(404).json({status:404, message:"There are no companies available"});
    }
    catch(err) {
        res.status(500).json({status:500, message: err.message});
    }
    finally {
        client.close();
    }
};

module.exports = {
    getItems,
    getCompanies,
};
