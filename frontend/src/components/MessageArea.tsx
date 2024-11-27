import { useEffect, useContext } from "react"
import { NotificationContext, UserContext } from "./contexts/AppContexts"

export default function MessageArea() {

    const {changeUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    const authenticateUser = async () => {
        const userId: string | undefined = localStorage.getItem("userId")?.trim()
        if(userId === undefined || userId === "") {
            changeUser({isValidUser: false, username: "", userId: "", profilePic: ""})
            changeNotification("error", "Please log in")
        }
        else {
            const res = await fetch(`http://localhost:8080/get-user?userId=${encodeURIComponent(userId)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if(data.status === "success") {
                changeUser({isValidUser: true, userId: userId, username: data.username, profilePic: data.profilePic})
                changeNotification("success", data.msg)
            }
            else
                changeNotification("error", data.msg)
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])

  return (
    <div className="message-area">MessageArea</div>
  )
}
