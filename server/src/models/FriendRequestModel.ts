
import { model, Schema } from "mongoose";

const FriendRequestSchema = new Schema({
    from: String,
    to: String,
    status: {type: String, enum: ["pending", "accepted", "declined"], default: "pending"},
    createdAt: {type: Date, default: Date.now}
})

const FriendRequestModel = model("FriendRequest", FriendRequestSchema);

export default FriendRequestModel;