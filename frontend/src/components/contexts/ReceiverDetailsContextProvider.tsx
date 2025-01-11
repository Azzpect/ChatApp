import { useState } from "react";
import { ProviderPropType, ReceiverDetailsContext } from "./AppContexts";

export default function ReceiverDetailsContextProvider({ children }: ProviderPropType) {
    const [receiver, setReceiver] = useState({id: "", username: "", profilePic: ""});

    const changeReceiverDetails = (receiver: {id: string, username: string, profilePic: string}) => {setReceiver(receiver)}

    return (
        <ReceiverDetailsContext.Provider value={{receiver, changeReceiverDetails}}>
            {children}
        </ReceiverDetailsContext.Provider>
    )

    
}