const  companies = require("./data/companies.json");

const items = require("./data/items.json");

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const collectionExists = async (db, collectionName) => {

    // const collections = await db.listCollections().toArray();
    // return collections.some(c => c.name === collectionName);

    const collection = db.collection(collectionName);

    return !(collection === undefined);
}

const batchImport = async() => {

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "ecommerce";

    try {
        // connect...
        await client.connect();
        // declare 'db'
        const db = client.db(dbName);

        try {
            //inserting items
            const insertItemsResult = await db.collection("items").insertMany(items);

            if (insertItemsResult.acknowledged && insertItemsResult.insertedCount > 0)
                console.log(`Status 200, ${insertItemsResult.insertedCount} items inserted!`);
            else
                console.log(`Status 500, insertion of items did not work`);
        }
        catch(err) {
            console.log(`Status 500, items insertion error:${err.message}`);
        }

        try {
            //inserting companies
            const insertCompaniesResult = await db.collection("companies").insertMany(companies);

            if (insertCompaniesResult.acknowledged && insertCompaniesResult.insertedCount > 0)
                console.log(`Status 200, ${insertCompaniesResult.insertedCount} companies inserted!`);
            else
                console.log(`Status 500, insertion of companies did not work`);
        }
        catch(err) {
            console.log(`Status 500, companies insertion error:${err.message}`);
        }
    }
    catch(err) {
        console.log(`Status 400, Insertion of items or companies did not work. Error: ${err.message}`);
    }
    finally {
        client.close();
    }
}

batchImport();