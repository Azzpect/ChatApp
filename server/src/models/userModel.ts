import { Schema, model } from "mongoose";


const userSchema = new Schema({
    userId: String,
    username: String,
    password: String,
    profilePic: String,
})

export const UserModel = model("user", userSchema)



