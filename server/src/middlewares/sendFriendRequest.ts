import { Request, Response, NextFunction } from 'express';
import FriendRequestModel from '../models/FriendRequestModel';
import { logger } from '../logger';

export default async function sendFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, friendId } = req.body;
        const friendRequest = new FriendRequestModel({
            from: userId,
            to: friendId
        });
        await friendRequest.save();
        logger.info(`Friend request sent from ${userId} to ${friendId}`);
        req.body.queryResult = {status: "success", msg: "Friend request sent successfully.", code: 201}
    } catch (err) {
        req.body.queryResult = {status: "error", msg: "Error sending friend request.", code: 500}
        logger.error(`Error sending friend request because of ${(err as Error).message}`);
    }
    finally {
        next();
    }
}