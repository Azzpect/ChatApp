import { Request, Response, NextFunction } from "express";
import FriendRequestModel from "@models/FriendRequestModel";
import { logger } from "../logger.js";

export default async function sendFriendRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, friendId } = req.body;

    const existingFriendRequest = await FriendRequestModel.findOne({
      $or: [
        { $and: [{ from: userId }, { to: friendId }] },
        { $and: [{ from: friendId }, { to: userId }] },
      ],
    });

    if (existingFriendRequest) {
      if (existingFriendRequest.status === "accepted")
        throw new Error("Already friends");
      else if (existingFriendRequest.status === "declined") {
        await existingFriendRequest.updateOne(
          { _id: existingFriendRequest._id },
          { $set: { status: "pending" } }
        );
      } else {
        throw new Error("Friend request already sent");
      }
    } else {
      const friendRequest = new FriendRequestModel({
        from: userId,
        to: friendId,
      });
      await friendRequest.save();
    }
    req.body.queryResult = {
      status: "success",
      msg: "Friend request sent successfully.",
      code: 201,
    };
    logger.info(`Friend request sent from ${userId} to ${friendId}`);
  } catch (err) {
    req.body.queryResult = {
      status: "error",
      msg: (err as Error).message,
      code: 500,
    };
    logger.error(
      `Error sending friend request because of ${(err as Error).message}`
    );
  } finally {
    next();
  }
}
