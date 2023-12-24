import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    reciever: {
        type: String,
        required: [true, "Please provide receiver email"],
    },
    sender: {
        type: String,
        required: [true, "Please provide sender email"],
    },
    for_bio: {
        type: String,
        required: [true],
    },
    sender_bio: [
        {
            type: String,
        },
    ],
});

const Request = mongoose.models.requests || mongoose.model("requests", requestSchema);

export default Request;
