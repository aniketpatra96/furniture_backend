const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL || null;
const DB = process.env.DB || null;
const dbConnect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URL + DB);
    console.log("Mongo Database connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
