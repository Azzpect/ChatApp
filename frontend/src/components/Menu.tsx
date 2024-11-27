import { useContext } from "react"
import { NotificationContext, UserContext } from "./contexts/AppContexts"


export default function Menu() {

    const {changeUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    return(
        <div className="menu">
            <h3 onClick={() => {
                document.querySelector(".profile")?.classList.toggle("active-profile")
                document.querySelector(".friends-section")?.classList.remove("active-friends-section")
                document.querySelector(".menu")?.classList.remove("active-menu")
            }}>Profile</h3>
            <h3 onClick={() => {
                document.querySelector(".profile")?.classList.remove("active-profile")
                document.querySelector(".friends-section")?.classList.toggle("active-friends-section")
                document.querySelector(".menu")?.classList.remove("active-menu")
            }}>Friends</h3>
            <h3 onClick={() => {
                document.querySelector(".menu")?.classList.remove("active-menu")
                document.querySelector(".profile")?.classList.remove("active-profile")
                document.querySelector(".friends-section")?.classList.remove("active-friends-section")
                localStorage.removeItem("userId")
                changeUser({isValidUser: false, userId: "", username: "", profilePic: ""})
                changeNotification("success", "Logged out from the account")
            }}>LogOut</h3>
        </div>
    )
}