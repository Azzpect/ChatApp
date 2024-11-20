import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: String,
    profilePic: String,
})

export const UserModel = model("user", userSchema)



