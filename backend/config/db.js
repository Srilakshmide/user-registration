const mongoose = require("mongoose");
const { config } = require("./config.js");
const { MongoClient } = require("mongodb")
require("dotenv").config();

const connectDB = async () => {
    //   try {
    //     await mongoose.connect(config.MONGO_CONFIG.MONGO_CONNECTION_STRING, {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     });
    //     console.log("MongoDB connected");
    //   } catch (error) {
    //     console.error("MongoDB connection failed", error);
    //     process.exit(1);
    //   }
    let client
    try {
        // Create a new MongoClient instance
        client = new MongoClient(config.MONGO_CONFIG.MONGO_CONNECTION_STRING)
        // Connect to the MongoDB server
        await client.connect()
        console.log("Connected to MongoDB")

        return client
    } catch (error) {
        throw new Error(error)
    } finally {
        client.close()
    }
};

module.exports = connectDB;
