import Menu from "./Menu";
import Form from "./Form";
import UserContextProvider from "./contexts/UserContextProvider";
import Notification from "./Notification";
import { useContext } from "react";
import { NotificationContext } from "./contexts/AppContexts";



export default function Navbar() {

    const {notification} = useContext(NotificationContext)

    function toggleMenu() {
        document.querySelector(".menu")?.classList.toggle("active-menu")
    }

    return (
        <>
            <nav className="navbar">
                <h1 className="primary-heading">ChatAPP</h1>
                <img onClick={toggleMenu} src="http://localhost:8080/public/profilepics/userIcon.svg" alt="" className="w-8 cursor-pointer"/>
                <UserContextProvider>
                    <Menu />
                    <Form />
                </UserContextProvider>
            </nav>
            {notification.msg !== "" && <Notification />}
        </>
    )
}