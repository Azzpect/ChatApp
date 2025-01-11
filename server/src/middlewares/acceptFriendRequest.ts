import { Request, Response, NextFunction } from "express";
import { logger } from "../logger.js";
import FriendRequestModel from "@models/FriendRequestModel";

export default async function acceptFriendRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { requestId } = req.body;

    const status = await FriendRequestModel.updateOne(
      { $and: [{ _id: requestId }, { status: "pending" }] },
      { $set: { status: "accepted" } }
    );
    if (status.modifiedCount === 1) {
      req.body.queryResult = {
        status: "success",
        msg: "Friend request accepted",
        code: 202,
      };
    } else {
      throw new Error("Friend request not found");
    }
  } catch (err) {
    logger.error(
      "Error in acceptFriendRequest middleware",
      (err as Error).message
    );
    req.body.queryResult = {
      status: "error",
      msg: (err as Error).message,
      code: 500,
    };
  } finally {
    next();
  }
}
