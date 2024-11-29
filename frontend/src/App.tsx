import FriendList from "./components/FriendList"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import NotificationContextProvider from "./components/contexts/NotificationContextProvider"
import UserContextProvider from "./components/contexts/UserContextProvider";
import MessageArea from "./components/MessageArea";
import FriendsSection from "./components/FriendsSection";
import ReceiverDetailsContextProvider from "./components/contexts/ReceiverDetailsContextProvider";


export default function App() {

    return (
        <UserContextProvider>
            <NotificationContextProvider>
                <section className="app">
                    <Navbar />
                    <ReceiverDetailsContextProvider>
                        <FriendList />
                        <MessageArea />
                    </ReceiverDetailsContextProvider>
                    <Profile />
                    <FriendsSection />
                </section>
            </NotificationContextProvider>
        </UserContextProvider>
    )
}

