const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
});

module.exports = Polls = mongoose.model("polls", pollsSchema);
