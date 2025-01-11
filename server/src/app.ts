import express, { Express, Request, Response } from "express";
import { connectToDB } from "./db.js";
import { userRouter } from "@routes/userRouter";
import cors from "cors";
import path from "path";
import { friendsRouter } from "@routes/friendsRouter";
import { Server } from "socket.io";
import { createServer } from "http";
import { onConnection } from "@middlewares/webSocket";
import messageRouter from "@routes/messageRouter";

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const port: string | unknown = process.env.PORT;

connectToDB();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/public/", express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use(userRouter);
app.use(friendsRouter);
app.use(messageRouter);

//websocket connection
io.on("connection", (socket) => {
  onConnection(socket);
});

server.listen(port, () => {
  console.log("server started");
});
