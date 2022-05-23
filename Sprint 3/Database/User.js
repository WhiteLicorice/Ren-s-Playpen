const mongoose = require("mongoose");

var schemaUser = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      unique: false,
      required: true,
    },
});

module.exports = mongoose.model("User", schemaUser);