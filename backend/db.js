const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://utsav:utsav22082003@cluster0.gegt41i.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
