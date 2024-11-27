import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { logger } from "../logger";


export default async function getPeopleList(req: Request, res: Response, next: NextFunction) {
    try {
        const {name} = req.query;
        const regex = new RegExp(`^${name}`);
        const peoples = await UserModel.find({"username": {$regex: regex}}).select("-_id username userId profilePic")
        req.body.queryResult = {status: "success", data: peoples, code: 200}
    } catch (err) {
        req.body.queryResult = {status: "error", message: (err as Error).message, code: 500}
        logger.error(`Error at getPeopleList middleware: ${(err as Error).message}`);
    }
    finally {
        next();
    }
}