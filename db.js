const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config(); 

const mongooseURI = process.env.MONGO_URL;

const connectToMongo = () => {
  mongoose
    .connect(mongooseURI)
    .then(() => console.log("Database is Connected"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
