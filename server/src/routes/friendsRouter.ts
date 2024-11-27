import { Request, Response, Router } from "express";
import getPeopleList from "../middlewares/getPeopleList";


export const friendsRouter = Router();


friendsRouter.get("/get-people-list", getPeopleList, (req: Request, res: Response) => {
    const {queryResult} = req.body
    res.status(queryResult.code)
    delete queryResult.code
    res.json({...queryResult})
})