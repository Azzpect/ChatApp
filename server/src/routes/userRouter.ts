
import { Router, Request, Response, NextFunction } from "express";
import { createNewUser } from "../middlewares/createNewUser";




export const userRouter = Router();


userRouter.post("/create-user", createNewUser, (req: Request, res: Response) => {
    const {status} = req.body
    res.status(status.code).json({message: status.msg})
})