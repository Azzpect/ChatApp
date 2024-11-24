
import { Router, Request, Response, NextFunction } from "express";
import { createNewUser } from "../middlewares/createNewUser";




export const userRouter = Router();


userRouter.post("/create-user", createNewUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})