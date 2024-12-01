import { useState } from "react";
import { UserContext } from "./AppContexts";
import { ProviderPropType } from "./AppContexts";


export default function UserContextProvider({children}: ProviderPropType) {
    const [user, setUser] = useState({username: "", userId: "", profilePic: ""})

    const changeUser = (value: {username: string, userId: string, profilePic: string}) => {setUser(value)}

    return(
        <UserContext.Provider value={{user, changeUser}}>
            {children}
        </UserContext.Provider>
    )
}