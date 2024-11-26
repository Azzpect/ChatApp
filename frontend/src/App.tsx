import FriendList from "./components/FriendList"
import Navbar from "./components/Navbar"
import NotificationContextProvider from "./components/contexts/NotificationContextProvider"

export default function App() {

    return (
        <NotificationContextProvider>
            <>
            <Navbar />
            <FriendList />
            </>
        </NotificationContextProvider>
    )
}

