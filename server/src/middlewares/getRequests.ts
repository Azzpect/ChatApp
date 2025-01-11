import { Request, Response, NextFunction } from "express";
import FriendRequestModel from "@models/FriendRequestModel";
import { logger } from "../logger.js";
import { UserModel } from "@models/UserModel";

export default async function getRequests(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query;
    const requests = await FriendRequestModel.find({
      $and: [{ to: userId }, { status: "pending" }],
    })
      .lean()
      .select("_id from");

    const requestData = await Promise.all(
      requests.map(async (request) => {
        const user = await UserModel.findOne({ userId: request.from })
          .lean()
          .select("userId username profilePic");
        return { ...user, requestId: request._id };
      })
    );

    req.body.queryResult = {
      status: "success",
      requests: requestData,
      code: 200,
    };
  } catch (err) {
    logger.error("Error in getRequests middleware: ", (err as Error).message);
    req.body.queryResult = {
      status: "error",
      code: 500,
      msg: "Internal Server Error",
    };
  } finally {
    next();
  }
}
