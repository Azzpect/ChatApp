import { useContext, useState } from "react";
import searchIcon from "../assets/search.svg";
import addFriend from "../assets/addFriend.svg";
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
            const response = await fetch(`http://localhost:8080/get-people-list?name=${encodeURIComponent(name)}`);
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
                {peopleList.filter(person => person.userId !== user.userId).map((person, index) => (
                    <FriendCard key={index} userId={person.userId} profilePic={person.profilePic} username={person.username} />
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
    username: string
}

function FriendCard({userId, profilePic, username}: FriendCardProps) {
    return (
        <div key={userId} className="friend-card">
            <img src={profilePic} alt="" />
            <h3>{username}</h3>
            <img src={addFriend} alt="" />
        </div>
    )
}