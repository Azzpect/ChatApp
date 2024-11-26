import FriendList from "./components/FriendList"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import NotificationContextProvider from "./components/contexts/NotificationContextProvider"
import UserContextProvider from "./components/contexts/UserContextProvider";
import MessageArea from "./components/MessageArea";


export default function App() {

    return (
        <UserContextProvider>
            <NotificationContextProvider>
                <section className="app">
                    <Navbar />
                    <FriendList />
                    <Profile />
                    <MessageArea />
                </section>
            </NotificationContextProvider>
        </UserContextProvider>
    )
}

