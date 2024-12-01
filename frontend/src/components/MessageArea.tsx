import { useContext, useEffect, useState } from "react"
import { NotificationContext, ReceiverDetailsContext, UserContext } from "./contexts/AppContexts"
import { sendMessageToServer } from "./SocketConnection"
import sendIcon from "../assets/send.svg"
import { socket } from "./SocketConnection"


export default function MessageArea() {

  const {receiver} = useContext(ReceiverDetailsContext)
  const {user} = useContext(UserContext)
  const {changeNotification} = useContext(NotificationContext)
  const [messages, setMessages] = useState<{message: string, createdAt: string, type: string}[]>([])

  useEffect(() => {
    const profile = document.querySelector(".profile") as HTMLElement
    const friends = document.querySelector(".friends-section") as HTMLElement
    const messageArea = document.querySelector(".message-area") as HTMLElement
    document.addEventListener("menuItemClicked", () => {
      if(!profile.classList.contains("active-profile") && !friends.classList.contains("active-friends-section"))
        messageArea.style.gridColumnEnd = "21"
      else
        messageArea.style.gridColumnEnd = "18"
    })
  })


  function sendMessage() {
    const messageElement = (document.querySelector(".message-area .input-container input") as HTMLInputElement)
    sendMessageToServer(messageElement.value, receiver.id)
    const message = messageElement.value
    setMessages(prevMessages => [...prevMessages, {message: message, createdAt: new Date().toLocaleString(), type: "sent"}])
    messageElement.value = ""
  }

  useEffect(() => {
    socket?.on("chat-message-received", ({message, createdAt}: {message: string, createdAt: string}) => {
      setMessages(prevMessages => [...prevMessages, {message, createdAt, type: "received"}])
    })
  }, [socket])

  async function getMessages() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/get-messages/?userId=${user.userId}&receiverId=${receiver.id}`) 

    const data = await res.json()
    if(data.status === "success")
      setMessages(data.messages)
    else
      changeNotification("error", "Failed to get messages")
  }
  
  useEffect(() => {
    if(receiver.id !== "")
      getMessages()
  }, [receiver])

  return (
    <>
    <div className="message-area">
      {receiver.id === "" && <Intro/>}
      {receiver.id!== "" && <>
      <div className="details">
        <img src={receiver.profilePic} alt="" />
        <h3>{receiver.username}</h3>
      </div>
      <div className="message-container">
        {messages.map((message, index) => {
          return <MessageCard key={index} message={message.message} createdAt={message.createdAt} type={message.type} />
        })}
      </div>
      <div className="input-container">
        <input type="text" name="" id="" placeholder="Message here..."/>
        <img className="w-10 cursor-pointer" src={sendIcon} alt="" onClick={sendMessage}/>
      </div>
      </>}
    </div>
    </>
  )
}

function Intro() {
  return (
    <div className="intro absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-slate-800">
      <h1 className="text-white text-3xl font-bold">ChatApp</h1>
      <p className="text-white text-sm">Welcome to ChatApp, a simple messaging app that allows you to chat with your friends.</p>
      <h3 className="text-white py-2 font-bold">Developed by <a className="underline" href="https://github.com/Azzpect">Azzpect</a></h3>
    </div>
  )
}

function MessageCard({message, createdAt, type}: {message: string, createdAt: string, type: string}) {
  return (
    <div className={`flex my-1 ${type === "sent" ? "self-end flex-row-reverse" : "self-start"}`}>
      <p className="bg-slate-400 font-semibold px-3 py-2 rounded-xl max-w-xl">{message}</p>
      <p className="text-white self-end text-xs px-2">{createdAt}</p>
    </div>
  )
}
