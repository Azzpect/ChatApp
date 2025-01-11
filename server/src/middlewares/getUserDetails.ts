import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models/UserModel";
import { logger } from "../logger.js";

export default async function getUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query;

    const user = await UserModel.findOne({ userId: userId })
      .lean()
      .select("username profilePic");

    if (user === null) throw new Error("Wrong userid. Please log in again.");

    req.body.queryResult = {
      status: "success",
      msg: `Logged in as ${user.username}`,
      user: { ...user },
      code: 200,
    };
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
