const mongoose = require("mongoose");

const pollsChoicesSchema = new mongoose.Schema({
    poll_id: {type: String, required: true},
    orderNum: {type: Number, required: true},
    choiceName: {type: String, required: true},
});

module.exports = Polls_Choices = mongoose.model("polls_choices", pollsChoicesSchema);