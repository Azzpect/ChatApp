import { useContext } from "react"
import { NotificationContext, UserContext } from "./contexts/AppContexts"


export default function Menu() {

    const {changeValidUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    return(
        <div id="menu" className="menu">
            <h3>Profile</h3>
            <h3>Friends</h3>
            <h3 onClick={() => {
                document.querySelector("#menu")?.classList.remove("active-menu")
                localStorage.removeItem("userId")
                changeValidUser(false)
                changeNotification("success", "Logged out from the account")
            }}>LogOut</h3>
        </div>
    )
}