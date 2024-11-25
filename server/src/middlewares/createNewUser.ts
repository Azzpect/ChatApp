import { UserModel } from "../models/userModel";
import { logger } from "../logger";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


export default async function createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, email, password} = req.body

        let profilePic = "http://localhost:8080/profilepics/default.svg"

        if(await isUserAlreadyExist(username, email))
            throw new UserExistError()

        let userPassword = jwt.sign(password, (process.env.PRIVATE_KEY as string))
        let userId = jwt.sign({username: username, password: userPassword}, (process.env.PRIVATE_KEY as string))
        let user = new UserModel({userId: userId, username: username, email: email, password: userPassword, profilePic: profilePic})
        await user.save()
        logger.info(`User created with userId: ${userId}`)
        req.body.queryData = {status: "success", msg: "User created successfully!", useId: userId, username: username, code: 201};
    } catch (error) {
        logger.error(`Error occurred: ${(error as Error).message}`)
        if(error instanceof UserExistError) {
            req.body.queryData = {status: "error", msg: error.message, code: 400}
        }
        else {
            req.body.queryData = {status: "error", msg: "error", code: 400}
        }
    }
    finally {
        next()
    }
}

class UserExistError extends Error {
    constructor() {
        super("User already exist")
    }
}

async function isUserAlreadyExist(username: string, email: string): Promise<boolean> {
    let user = await UserModel.findOne({username: username}) || await UserModel.findOne({email: email})
    return user != null
}