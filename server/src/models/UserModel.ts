import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: String,
  username: String,
  email: String,
  password: String,
  profilePic: {
    type: String,
    default: `${process.env.HOST}/public/userIcon.svg`,
  },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model("user", userSchema);
