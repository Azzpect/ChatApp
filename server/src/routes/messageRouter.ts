import { Request, Response, Router } from "express";
import MessageModel from "@models/MessageModel";

const messageRouter = Router();

messageRouter.get("/get-messages", async (req: Request, res: Response) => {
  try {
    const { userId, receiverId } = req.query;

    let rawMessages = await MessageModel.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    })
      .lean()
      .select("message createdAt sender receiver");

    rawMessages.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const messages = rawMessages.map(
      ({ sender, receiver, _id, ...message }) => {
        return { ...message, type: sender === userId ? "sent" : "received" };
      }
    );

    res.status(200).json({ status: "success", messages: messages });
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as Error).message });
  }
});

export default messageRouter;
