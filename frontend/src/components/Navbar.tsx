import Menu from "./Menu";
import Form from "./Form";
import Notification from "./Notification";
import Loader from "./Loader";
import { useContext } from "react";
import { LoaderContext, NotificationContext, UserContext } from "./contexts/AppContexts";



export default function Navbar() {

    const {notification} = useContext(NotificationContext)
    const {user} = useContext(UserContext)
    const {loading} = useContext(LoaderContext)

    function toggleMenu() {
        document.querySelector(".menu")?.classList.toggle("active-menu")
    }

    return (
        <>
            {loading && <Loader />}
            <nav className="navbar">
                <h1 className="primary-heading">ChatAPP</h1>
                {user.userId !== "" && 
                <div onClick={toggleMenu}  className="profile-container">
                    <img src={user.profilePic} alt="" className="w-8 h-8 rounded-full"/>
                    <h4 className="text-white font-semibold px-1">{user.username}</h4>
                </div>
                }
                <Menu />
                {user.userId === "" && <Form />}
            </nav>
            {notification.msg !== "" && <Notification />}
        </>
    )
}