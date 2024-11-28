import { Request, Response, NextFunction } from "express";
import FriendRequestModel from "../models/FriendRequestModel";
import { logger } from "../logger";
import { UserModel } from "../models/UserModel";

export default async function getRequests(req: Request, res: Response, next: NextFunction) {
    try {
        const {userId} = req.query;
        const requests = await FriendRequestModel.find({$and: [{to: userId}, {status: "pending"}]}).select("-status -__v -createdAt -to");
        const userData = await Promise.all(requests.map(async (request) => {
            return await UserModel.findOne({userId: request.from}).select("-password -__v -createdAt -_id -email -userId");
        }));
        const requestData = userData.filter(user => user !== null).map((user, index) => {
            return {requestId: requests[index]._id, username: user.username, profilePic: user.profilePic}
        })
        req.body.queryResult = {status: "success", requests: requestData, code: 200}
    } catch (err) {
        logger.error("Error in getRequests middleware: ", (err as Error).message);
        req.body.queryResult = {status: "error", code: 500, msg: "Internal Server Error"}
    }
    finally {
        next();
    }
}