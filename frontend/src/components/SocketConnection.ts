import { io } from "socket.io-client"
import { Socket } from "socket.io-client"

export let socket: Socket


export const connectSocket = (id: string) => {
    socket = io(import.meta.env.VITE_API_URL, {
        autoConnect: false,
        query: {userId: id}
    })
    socket.connect()

}

export const sendMessageToServer = (message: string, receiverId: string) => {
    socket.emit("chat-message", message, receiverId)
}


