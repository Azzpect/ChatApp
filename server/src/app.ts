import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import path from "path";
import { friendsRouter } from "./routes/friendsRouter";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { onConnection, onDisconnection, onMessage } from "./middlewares/webSocket";

const app: Express = express();
const server = createServer(app);
export let webSocket: Socket;
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

//websocket connection
io.on("connection", (socket) => {
    webSocket = socket;
    onConnection();
    socket.on("disconnect", onDisconnection);
    socket.on("message", onMessage)
});



server.listen(port, () => {
    console.log("server started");
})