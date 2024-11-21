import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db";
import { userRouter } from "./routes/userRouter";

const app: Express = express();
const port: unknown = process.env.PORT


connectToDB()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
})

app.use(userRouter)



app.listen(port, () => {
    console.log("server started");
})