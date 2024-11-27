import { io } from "socket.io-client"



const socket = io("http://localhost:8080", {
    autoConnect: false,
})

export const connectSocket = () => {
    socket.connect()
}

export const disconnectSocket = () => {
    socket.disconnect()
}

export const sendMessageToServer = (message: string) => {
    socket.emit("message", message)
}


socket.on("connect", () => {
    console.log("connected to server");
})

socket.on("disconnect", () => {
    console.log("disconnect from server");
})
