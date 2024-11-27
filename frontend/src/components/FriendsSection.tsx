import { useContext, useState } from "react";
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
            const response = await fetch(`http://localhost:8080/get-people-list?name=${encodeURIComponent(name)}&userId=${encodeURIComponent(user.userId)}`);
            const data = await response.json();
            setPeopleList(data.data)
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
                    <FriendCard key={index} userId={person.userId} profilePic={person.profilePic} username={person.username} requestStatus={person.requestStatus} />
                ))}
            </div>
        </div>
    )
}
function Requests() {
    return (
        <div className="requests-section friends-section-sub-element"></div>
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
    requestStatus: string
}

function FriendCard({userId, profilePic, username, requestStatus}: FriendCardProps) {

    const {user} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)

    async function sendFriendRequest(e: React.SyntheticEvent<HTMLImageElement>) {
        const receiverId = (e.target as HTMLImageElement).parentElement?.getAttribute("data-user-id") as string
        const res = await fetch("http://localhost:8080/add-friend", {
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
            {requestStatus === "declined" && <img src={addFriend} onClick={sendFriendRequest} alt="" />}
            {requestStatus === "pending" && <img src={requestPending} alt="" />}
        </div>
    )
}