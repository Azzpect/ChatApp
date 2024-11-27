

export function onConnection() {
    console.log("A user connected");
}

export function onDisconnection() {
    console.log("User has  disconnected");
}

export function onMessage(message: string) {
    console.log("Message received: " + message);
}
