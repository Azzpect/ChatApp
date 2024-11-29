import { useContext, useEffect } from "react"
import { ReceiverDetailsContext } from "./contexts/AppContexts"


export default function MessageArea() {

  const {receiver} = useContext(ReceiverDetailsContext)

  useEffect(() => {
    document.addEventListener("menuItemClicked", () => {
      const profile = document.querySelector(".profile") as HTMLElement
      const friends = document.querySelector(".friends-section") as HTMLElement
      const messageArea = document.querySelector(".message-area") as HTMLElement
      if(!profile.classList.contains("active-profile") && !friends.classList.contains("active-friends-section"))
        messageArea.style.gridColumnEnd = "21"
      else
        messageArea.style.gridColumnEnd = "18"
    })
  })

  return (
    <>
    <div className="message-area">
      {receiver.id === "" && <Intro/>}
      {receiver.id!== "" && <>
      <div className="details">
        <img src={receiver.profilePic} alt="" />
        <h3>{receiver.username}</h3>
      </div>
      <div className="message-container"></div>
      <div className="input-container">
        <input type="text" name="" id="" placeholder="Message here..."/>
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
