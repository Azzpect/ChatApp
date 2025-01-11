import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models/UserModel";
import { logger } from "../logger.js";

export default async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, username, profilePic } = req.body;

    const user = UserModel.findOne({ userId: userId });

    if (user === null) throw new Error("Profile update failed");

    await UserModel.updateOne(
      { userId: userId },
      { $set: { username: username, profilePic: profilePic } }
    );

    req.body.queryResult = {
      status: "success",
      msg: "Profile updated successfully",
      code: 200,
    };
    logger.info(`Success: Profile updated successfully for user ${userId}`);
  } catch (err) {
    logger.error(`Error: ${(err as Error).message}`);
    req.body.queryResult = {
      status: "success",
      msg: (err as Error).message,
      code: 401,
    };
  } finally {
    next();
  }
}
