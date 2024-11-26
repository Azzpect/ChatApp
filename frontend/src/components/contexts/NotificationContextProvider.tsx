import { useState } from "react";
import { ProviderPropType } from "./AppContexts";
import { NotificationContext } from "./AppContexts";


export default function NotificationContextProvider({children}: ProviderPropType) {
    const [notification, setNotification] = useState({type: "", msg: ""})

    const changeNotification = (type: string, msg: string) => {setNotification({type: type, msg: msg})}

    return (
        <NotificationContext.Provider value={{notification, changeNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}