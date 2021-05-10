import mongoose from "mongoose";

const pollSchema = mongoose.Schema({
    title: String,
    message: String,
    choices: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
    votes: {
        type: [Object],
        default: []
    },
    voteCount: {
        type: Number,
        default: 0,
    },
    username: String,
    creator: String,
});

const Polls = mongoose.model("Polls", pollSchema);
export default Polls;