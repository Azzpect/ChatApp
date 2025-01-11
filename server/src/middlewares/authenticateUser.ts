import { Request, Response, NextFunction } from "express";
import { UserModel } from "@models/UserModel";
import * as jwt from "jsonwebtoken";
import { logger } from "../logger.js";

type User = {
  _id: string;
  userId: string;
  email: string;
  password: string;
  profilePic: string;
};

export default async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    const account = await UserModel.findOne({ username: username });
    if (account === null) throw new Error("Wrong credentials");

    const signedPassword = jwt.sign(
      password,
      process.env.PRIVATE_KEY as string
    );

    const user = account as object as User;

    if (user.password === signedPassword)
      req.body.queryResult = {
        status: "success",
        msg: `Logged in as ${username}`,
        userId: user.userId,
        code: 200,
      };
    else throw new Error("Wrong credentials");
  } catch (err) {
    logger.error(`Error occurred: ${(err as Error).message}`);
    req.body.queryResult = {
      status: "error",
      msg: (err as Error).message,
      code: 401,
    };
  } finally {
    next();
  }
}
