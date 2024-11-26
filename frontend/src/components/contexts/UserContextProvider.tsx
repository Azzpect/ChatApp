import { useState } from "react";
import { UserContext } from "./AppContexts";
import { ProviderPropType } from "./AppContexts";
import { User } from "./AppContexts";



export default function UserContextProvider({children}: ProviderPropType) {
    const [user, setUser] = useState({isValidUser: false, username: "", userId: "", profilePic: ""})

    const changeUser = (value: User) => {setUser(value)}

    return(
        <UserContext.Provider value={{user, changeUser}}>
            {children}
        </UserContext.Provider>
    )
}