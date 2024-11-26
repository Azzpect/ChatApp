import { useContext } from "react"
import { UserContext } from "./contexts/AppContexts"


export default function Profile() {

    const {user} = useContext(UserContext)

    return(
        <div className="profile">
            <img src={user.profilePic} alt="" className="rounded-full w-3/4"/>
        </div>
    )
}