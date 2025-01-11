import triangle from "../assets/triangle.svg"
import { UserContext, NotificationContext, ReceiverDetailsContext } from "./contexts/AppContexts"
import { useContext, useEffect, useState } from "react"

interface FriendCardProps {
    profilePic: string,
    username: string,
    userId: string
}

export default function FriendList() {
    const [friendList, setFriendList] = useState<FriendCardProps[]>([])

    const {user} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    async function getFriends() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-friends?userId=${encodeURIComponent(user.userId)}`)
        const data = await res.json()
        if(data.friends === undefined)
            return
        if(data.status === "success" && data.friends.length > 0) {
            setFriendList(data.friends)
        }
        else if(data.status === "error") {
            changeNotification(data.status, data.msg)
        }
    }

    useEffect(() => {
        if(user.userId !== "")
            getFriends()
    }, [user])

    return (
        <div className="friends-bar">
            {
               friendList.map((friend, index) => {
                return <FriendCard key={index} profilePic={friend.profilePic} username={friend.username} userId={friend.userId} />
               })
            }
        </div>
    )
}


function FriendCard({profilePic, username, userId}: FriendCardProps) {

    const {changeReceiverDetails} = useContext(ReceiverDetailsContext)

    return (
        <div data-user-id={userId} onClick={() => {changeReceiverDetails({id: userId, username: username, profilePic: profilePic})}} className="group relative w-full overflow-x-visible">
            <img src={profilePic} alt="" className="w-10 h-10 my-2 rounded-full mx-auto cursor-pointer"/>
            <div className="absolute hidden group-hover:block left-[120%] top-1/2 -translate-y-1/2 bg-slate-900 p-2 whitespace-nowrap rounded-xl border-solid border-white border-2">
                <img className="absolute right-full w-4 rotate-90" src={triangle} alt="" />
                <h3 className="text-white">{username}</h3>
            </div>
        </div>
    )
}