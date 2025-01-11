import { NextFunction, Request, Response } from "express";
import FriendRequestModel from "@models/FriendRequestModel";
import { logger } from "../logger.js";
import { UserModel } from "@models/UserModel";

export default async function getAllFriends(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query;
    const friendRequests = await FriendRequestModel.find({
      $and: [
        { $or: [{ from: userId }, { to: userId }] },
        { status: "accepted" },
      ],
    }).select("-status");
    const friends = await Promise.all(
      friendRequests.map(async (request) => {
        if (request.from === userId) {
          return await UserModel.findOne({ userId: request.to }).select(
            "username userId profilePic"
          );
        } else {
          return await UserModel.findOne({ userId: request.from }).select(
            "username userId profilePic"
          );
        }
      })
    );
    req.body.queryResult = { status: "success", friends: friends, code: 200 };
  } catch (err) {
    logger.error(`Error: ${(err as Error).message}`);
    req.body.queryResult = {
      status: "error",
      msg: "Some internal error occurred",
      code: 500,
    };
  } finally {
    next();
  }
}
