import { useContext, useEffect } from "react";
import { NotificationContext } from "./contexts/AppContexts";




export default function Notification() {

    const {notification, changeNotification} = useContext(NotificationContext)
    
    useEffect(() => {
        document.querySelector("#bar")?.addEventListener("animationend", (e) => {
            const element = e.target as HTMLElement
            const parent = element.parentElement
            if(parent !== null) {
                parent.classList.remove("animate-slide-in")
                parent.classList.add("animate-slide-out")
            }
        })
        document.querySelector("#notification")?.addEventListener("animationend", (e) => {
            const element = e.target as HTMLElement
            if(element.classList.contains("animate-slide-out")) {
                changeNotification("", "")
            }
        })
        document.querySelector("#notification")?.addEventListener("click", () => {
            const element = document.querySelector("#notification") as HTMLElement
            element.classList.remove("animate-slide-in")
            element.classList.add("animate-slide-out")
        })
    })

    return (
        <div id="notification" className={`notification ${notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'} animate-slide-in`}>
            <p className="px-3">{notification.msg}</p>
            <div id="bar" className={`${notification.type === 'success'? 'bg-green-700' : 'bg-red-700'} w-full h-2 absolute bottom-0 animate-bar`}></div>
        </div>
    )
}
