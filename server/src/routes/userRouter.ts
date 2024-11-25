
import { Router, Request, Response, NextFunction } from "express";
import createNewUser from "../middlewares/createNewUser";
import authenticateUser from "../middlewares/authenticateUser";




export const userRouter = Router();


userRouter.post("/create-user", createNewUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})

userRouter.post("/auth-user", authenticateUser, (req: Request, res: Response) => {
    const {queryData} = req.body
    res.status(queryData.code)
    delete queryData.code
    res.json({...queryData})
})