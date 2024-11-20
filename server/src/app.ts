import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db";
import { UserModel } from "./models/userModel";
import { logger } from "./logger";

const app: Express = express();
const port: unknown = process.env.PORT


connectToDB()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
    logger.info("New request")
})

app.post("/create-user", async (req: Request, res: Response) => {
    try {
        const {username, profilePic} = req.body
        let user = new UserModel({name: username, profilePic: profilePic})
        await user.save()
        res.json({status: "success"})
    } catch (error) {
        res.json({status: "error"})
    }
})



app.listen(port, () => {
    console.log("server started");
})