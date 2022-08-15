"use strict";

const { MongoClient, ConnectionCheckedInEvent } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**********************************************************/
/*   getOders: returns all the orders
/**********************************************************/
const getOrders = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const dbName = "ecommerce";

  try {
    await client.connect();

    const db = client.db(dbName);

    const OrdersArray = await db.collection("Orders").find().toArray();

    if (OrdersArray.length > 0) {
      return res.json({
        data: OrdersArray,
        message: "You successfully get all the orders",
      });
    } else
      res
        .status(404)
        .json({ status: 404, message: "There are no Orders available" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getOrders };
