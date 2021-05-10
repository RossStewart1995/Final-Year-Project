const mongoose = require("mongoose");

const pollsResultSchema = new mongoose.Schema({
    poll_id: {type: String, required: true},
    choice_id: {type: String, required: true},
    user_id: {type: String, required: true},
});

module.exports = Polls_Results = mongoose.model("polls_results", pollsResultSchema);