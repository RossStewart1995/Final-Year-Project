import mongoose from "mongoose";

const petitionSchema = mongoose.Schema({
    title: String,
    message: String,
    recipient: [],
    topic: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
    signatures: {
        type: [Object],
        default: []
    },
    signatureCount: {
        type: Number,
        default: 0,
    },
    image: String,
    username: String,
    creator: String,
});

const Petitions = mongoose.model("Petitions", petitionSchema);
export default Petitions;