const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique:true,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("User", userSchema);
