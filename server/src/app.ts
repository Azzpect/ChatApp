import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import path from "path";

const app: Express = express();
const port: string | unknown = process.env.PORT
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

connectToDB()
app.use(express.json())
app.use(cors(corsOptions))
app.use("/public/", express.static(path.join(__dirname, "../public")))

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
})

app.use(userRouter)



app.listen(port, () => {
    console.log("server started");
})