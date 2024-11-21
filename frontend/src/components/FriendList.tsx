import userIcon from "../assets/userIcon.svg"

interface FriendCardProps {
    icon: string,
    name: string
}

export default function FriendList() {
    const friendList: FriendCardProps[] = [
        {icon: userIcon, name: "atanu"},
        {icon: userIcon, name: "santanu"},
        {icon: userIcon, name: "satyamurthi"}
    ]
    return (
        <div className="bg-slate-800 h-screen w-16 flex flex-col items-center">
            {
               friendList.map((friend) => {
                return <FriendCard icon={friend.icon} name={friend.name} />
               })
            }
        </div>
    )
}


function FriendCard({icon, name}: FriendCardProps) {
    return (
        <div className="group relative w-full overflow-x-visible">
            <img src={icon} alt="" className="w-10 my-2 mx-auto cursor-pointer"/>
            <div className="absolute hidden group-hover:block right-[-2.5rem] top-1/2 -translate-y-1/2 bg-slate-900 p-2 whitespace-nowrap">
                <h3 className="">{name}</h3>
            </div>
        </div>
    )
}