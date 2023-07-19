const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/shop-online").then(
    ()=>{
        console.log("Connection is successful.")
    }).catch((err)=>{
        console.log(err)
    })
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;
