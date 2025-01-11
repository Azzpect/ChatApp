import { Socket } from "socket.io";
import MessageModel from "@models/MessageModel";

let onlineUsers: Map<string, Socket> = new Map();

export function onConnection(socket: Socket) {
  let userId = socket.handshake.query.userId as string;
  onlineUsers.set(userId, socket);
  console.log("A user connected");
  socket.on("disconnect", () => {
    onDisconnection(userId);
  });
  socket.on("chat-message", (message: string, receiverId: string) => {
    onChatMessage(message, receiverId, userId);
  });
}

function onDisconnection(userId: string) {
  console.log("User has  disconnected");
  onlineUsers.delete(userId);
}

async function onChatMessage(
  message: string,
  receiverId: string,
  userId: string
) {
  if (onlineUsers.has(receiverId)) {
    const messageObj = await MessageModel.create({
      message: message,
      sender: userId,
      receiver: receiverId,
    });
    await messageObj.save();
    onlineUsers
      .get(receiverId)
      ?.emit("chat-message-received", {
        message: message,
        createdAt: new Date().toLocaleString(),
      });
  } else console.log("receiver is offline");
}
