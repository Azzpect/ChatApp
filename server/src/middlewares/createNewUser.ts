import { UserModel } from "../models/userModel";
import { logger } from "../logger";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


export async function createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {username, password, profilePic} = req.body

        if(await isUserAlreadyExist(username))
            throw new UserExistError()

        let userPassword = jwt.sign(password, (process.env.PRIVATE_KEY as string))
        let userId = jwt.sign({username: username, password: userPassword}, (process.env.PRIVATE_KEY as string))
        let user = new UserModel({userId: userId, username: username, password: userPassword, profilePic: profilePic})
        await user.save()
        logger.info(`User created with userId: ${userId}`)
        req.body.status = {msg: "success", code: 201};
    } catch (error) {
        if(error instanceof UserExistError) {
            logger.error(`Error occurred: ${(error as Error).message}`)
            req.body.status = {msg: error.message, code: 400}
        }
        else {
            logger.error(`Error occurred: ${(error as Error).message}`)
            req.body.status = {msg: "error", code: 400}
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

async function isUserAlreadyExist(username: string): Promise<boolean> {
    let user = await UserModel.findOne({username: username})
    return user != null
}