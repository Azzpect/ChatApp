import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    message: String,
    sender: String,
    receiver: String,
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    }
});

const MessageModel = model("Message", MessageSchema);

export default MessageModel;