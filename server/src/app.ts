import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import path from "path";
import { friendsRouter } from "./routes/friendsRouter";
import { Server } from "socket.io";
import { createServer } from "http";
import { onConnection } from "./middlewares/webSocket";
import messageRouter from "./routes/messageRouter";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    }
})
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
app.use(friendsRouter)
app.use(messageRouter)

//websocket connection
io.on("connection", (socket) => {
    onConnection(socket);
});



server.listen(port, () => {
    console.log("server started");
})