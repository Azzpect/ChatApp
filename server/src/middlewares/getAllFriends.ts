import { NextFunction, Request, Response } from "express";
import FriendRequestModel from "../models/FriendRequestModel";
import { logger } from "../logger";
import { UserModel } from "../models/UserModel";



export default async function getAllFriends(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        const friendRequests = await FriendRequestModel.find({
            $and: [
                {$or: [
                    {from: userId},
                    {to: userId}
                ]},
                {status: "accepted"}
            ]
        }).select("-status")
        const [friends] = await Promise.all(friendRequests.map(async (request) => {
            if(request.from === userId) {
                return await UserModel.find({userId: request.to}).select("-_id -password -__v -createdAt -email")
            }
            else {
                return await UserModel.find({userId: request.from}).select("-_id -password -__v -createdAt -email")
            }
        }))
        req.body.queryResult = {status: "success", friends: friends, code: 200}
    }
    catch(err) {
        logger.error(`Error: ${(err as Error).message}`);
        req.body.queryResult = {status: "error", msg: "Some internal error occurred", code: 500}
    }
    finally {
        next();
    }
}