const mongoose = require("mongoose");

var schemaMessage = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Message", schemaMessage);