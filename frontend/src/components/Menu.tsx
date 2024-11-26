import { useContext } from "react"
import { NotificationContext, UserContext } from "./contexts/AppContexts"


export default function Menu() {

    const {changeValidUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    return(
        <div className="menu">
            <h3 onClick={() => {
                document.querySelector(".profile")?.classList.toggle("active-profile")
                document.querySelector(".menu")?.classList.remove("active-menu")
            }}>Profile</h3>
            <h3>Friends</h3>
            <h3 onClick={() => {
                document.querySelector(".menu")?.classList.remove("active-menu")
                document.querySelector(".profile")?.classList.remove("active-profile")
                localStorage.removeItem("userId")
                changeValidUser(false)
                changeNotification("success", "Logged out from the account")
            }}>LogOut</h3>
        </div>
    )
}