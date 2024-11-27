import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { logger } from "../logger";
import FriendRequestModel from "../models/FriendRequestModel";



export default async function getPeopleList(req: Request, res: Response, next: NextFunction) {
    try {
        const {name, userId} = req.query;
        const regex = new RegExp(`^${name}`);
        const allPeople = await UserModel.find({"username": {$regex: regex}}).select("-_id -password -__v -createdAt -email")
        const allRequests = await FriendRequestModel.find({from: userId})
        let rawPeople = allPeople.filter(person => person.userId !== userId).map(person => {
            return {userId: person.userId, username: person.username, profilePic: person.profilePic, requestStatus: "declined"}
        })
        const people = rawPeople.map(person => {
            let flag = true
            allRequests.forEach(request => {
                if (request.to === person.userId && request.status === "pending") {
                    person.requestStatus = "pending"
                    return
                }
                else if (request.to === person.userId && request.status === "accepted") {
                    flag = false
                    return
                }
            })
            if(flag)
                return person
        }).filter(person => person !== undefined)
        req.body.queryResult = {status: "success", data: people, code: 200}
    } catch (err) {
        req.body.queryResult = {status: "error", message: (err as Error).message, code: 500}
        logger.error(`Error at getPeopleList middleware: ${(err as Error).message}`);
    }
    finally {
        next();
    }
}