import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { logger } from "../logger";


export default async function getUserDetails(req: Request, res: Response, next: NextFunction) {

    try {
        const {userId} = req.body;

        const user = await UserModel.findOne({userId: userId})

        if(user === null)
            throw new Error("Wrong userid. Please log in again.")

        req.body.queryData = {status: "success", msg: `Logged in as ${user.username}`, code: 200}
    }
    catch(err) {
        logger.error(`Error occurred: ${(err as Error).message}`)
        req.body.queryData = {status: "error", msg: (err as Error).message, code: 401}
    }
    finally {
        next()
    }
}