import { useState } from "react";
import { UserContext } from "./AppContexts";
import { ProviderPropType } from "./AppContexts";




export default function UserContextProvider({children}: ProviderPropType) {
    const [isValidUser, setValidUser] = useState(false)

    const changeValidUser = (value: boolean) => {setValidUser(value)}

    return(
        <UserContext.Provider value={{isValidUser, changeValidUser}}>
            {children}
        </UserContext.Provider>
    )
}