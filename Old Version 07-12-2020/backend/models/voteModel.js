const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    question: {type: String, required: true},
    description: {type: String},
    responses: {type: Array, required: true},
});

module.exports = Vote = mongoose.model("vote", voteSchema);