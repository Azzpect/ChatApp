import { NextFunction, Request, Response, Router } from "express";
import getPeopleList from "../middlewares/getPeopleList";
import sendFriendRequest from "../middlewares/sendFriendRequest";


export const friendsRouter = Router();


friendsRouter.get("/get-people-list", getPeopleList, (req: Request, res: Response) => {
    const {queryResult} = req.body
    res.status(queryResult.code)
    delete queryResult.code
    res.json({...queryResult})
})

friendsRouter.post("/add-friend", sendFriendRequest, (req: Request, res: Response) => {
    const {queryResult} = req.body
    res.status(queryResult.code)
    delete queryResult.code
    res.json({...queryResult})
})