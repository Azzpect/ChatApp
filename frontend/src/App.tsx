import FriendList from "./components/FriendList"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import NotificationContextProvider from "./components/contexts/NotificationContextProvider"

export default function App() {

    return (
        <NotificationContextProvider>
            <section className="app">
                <Navbar />
                <FriendList />
                <Profile />
            </section>
        </NotificationContextProvider>
    )
}

