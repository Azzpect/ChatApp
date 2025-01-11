import { Schema, model } from "mongoose";

const TempUserSchema = new Schema({
    userId: String,
    username: String,
    email: String,
    password: String,
    profilePic: {
        type: String,
        default: `${process.env.HOST}/public/userIcon.svg`
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1D"
    }
});

const TempUser = model("TempUser", TempUserSchema);

export default TempUser;