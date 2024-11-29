import { useContext, useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import addFriend from "../assets/addFriend.svg";
import requestPending from "../assets/requestPending.svg";
import { NotificationContext, UserContext } from "./contexts/AppContexts";



export default function FriendsSection() {

    const [activeBtn, setActiveBtn] = useState(0);

    const changeActiveBtn = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const btn = e.target as HTMLButtonElement;
        const btns = document.querySelectorAll(".friends-section>.btn-container>button");
        for(let i=0; i<btns.length; i++){
            if(btns[i]!== btn){
                btns[i].classList.remove("active-friends-btn");
            }
        }
        btn.classList.add("active-friends-btn");
        setActiveBtn(parseInt(btn.value));
    }

    useEffect(() => {
        if(activeBtn === 1) {
            const e = new Event("fetch-pending-requests")
            document.dispatchEvent(e)
        }
    }, [activeBtn])

    return(
        <div className="friends-section">
            <div className="btn-container">
                <button value={0} onClick={changeActiveBtn} className="active-friends-btn">Add Friend</button>
                <button value={1} onClick={changeActiveBtn}>Requests</button>
                <button value={2} onClick={changeActiveBtn}>All Friends</button>
            </div>
            {activeBtn === 0 && <AddFriend />}
            {activeBtn === 1 && <Requests />}
            {activeBtn === 2 && <AllFriends />}
        </div>
    )
}

function AddFriend() {

    const {changeNotification} = useContext(NotificationContext)
    const {user} = useContext(UserContext)
    const [peopleList, setPeopleList] = useState<FriendCardProps[]>([])

    async function findPeople() {
        try {
            const name = (document.querySelector(".add-friend-section>.search-element>input") as HTMLInputElement).value.trim();
            if(name === "")
                throw new Error("Please enter a name to search for")
            const response = await fetch(`${import.meta.env.VITE_API_URL}/get-people-list?name=${encodeURIComponent(name)}&userId=${encodeURIComponent(user.userId)}`);
            const data = await response.json();
            setPeopleList(data.peopleList)
        }
        catch(err) {
            changeNotification("error", (err as Error).message)
        }
    }

    return (
        <div className="add-friend-section friends-section-sub-element">
            <div className="search-element">
                <input type="text" placeholder="Search people here..."/>
                <img onClick={findPeople} src={searchIcon} alt="" />
            </div>
            <div className="search-results">
                {peopleList.map((person, index) => (
                    <FriendCard key={index} userId={person.userId} profilePic={person.profilePic} username={person.username} status={person.status} />
                ))}
            </div>
        </div>
    )
}
function Requests() {

    const {user} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)
    const [requests, setRequests]  = useState<RequestCardProps[]>([])

    async function getPendingRequests() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-requests?userId=${encodeURIComponent(user.userId)}`)
        const data = await res.json()
        if(data.status === "success")
            if(data.requests === undefined)
                console.log("No pending requests")
            else
                setRequests(data.requests)
        else
            changeNotification("error", data.msg)
    }

    useEffect(() => {
        document.addEventListener("fetch-pending-requests", getPendingRequests)
    })

    return (
        <div className="requests-section friends-section-sub-element">
            {requests.map((request, index) => {
                return <RequestCard key={index} requestId={request.requestId} profilePic={request.profilePic} username={request.username} />
            })}
        </div>
    )
}

interface RequestCardProps {
    requestId: string,
    profilePic: string,
    username: string
}

function RequestCard({requestId, profilePic, username}: RequestCardProps) {

    const {changeNotification} = useContext(NotificationContext)
    const {user, changeUser} = useContext(UserContext)

    const acceptRequest = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/accept-request`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                requestId: (e.target as HTMLButtonElement).parentElement?.parentElement?.getAttribute("data-request-id") as string
            })
        })
        const data = await res.json()
        if(data.status === "success")
            changeUser({...user})
        changeNotification(data.status, data.msg)
    }

    const declineRequest = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/decline-request`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                requestId: (e.target as HTMLButtonElement).parentElement?.parentElement?.getAttribute("data-request-id") as string
            })
        })
        const data = await res.json()
        if(data.status === "success")
            changeUser({...user})
        changeNotification(data.status, data.msg)
    }

    return (
        <div data-request-id={requestId} className="request-card">
            <div className="details">
                <img src={profilePic} alt="" />
                <h3>{username}</h3>
            </div>
            <div className="request-btn-container">
                <button onClick={acceptRequest}>Accept</button>
                <button onClick={declineRequest}>Decline</button>
            </div>
        </div>
    )
}


function AllFriends() {
    return (
        <div className="all-friends-section friends-section-sub-element"></div>
    )
}


interface FriendCardProps {
    userId: string,
    profilePic: string,
    username: string,
    status: string
}

function FriendCard({userId, profilePic, username, status}: FriendCardProps) {

    const {user} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    async function sendFriendRequest(e: React.SyntheticEvent<HTMLImageElement>) {
        const receiverId = (e.target as HTMLImageElement).parentElement?.getAttribute("data-user-id") as string
        const res = await fetch(`${import.meta.env.VITE_API_URL}/add-friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.userId,
                friendId: receiverId
            })
        })
        const data = await res.json()
        changeNotification(data.status, data.msg)
        if(data.status === "success")
            (e.target as HTMLImageElement).src = requestPending
    }

    return (
        <div data-user-id={userId} className="friend-card">
            <img src={profilePic} alt="" />
            <h3>{username}</h3>
            {status === "declined" && <img src={addFriend} onClick={sendFriendRequest} alt="" />}
            {status === "pending" && <img src={requestPending} alt="" />}
        </div>
    )
}