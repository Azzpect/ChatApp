import { createContext, ReactNode } from "react";
import UserState from "../../types/UserState";


export interface ProviderPropType {
    children: ReactNode
}



export const UserContext = createContext({user: {isValidUser: false, username: "", userId: "", profilePic: ""}, changeUser: (value: UserState) => {console.log(value);}})

export const NotificationContext = createContext({notification: {type: "", msg: ""}, changeNotification: (type: string, msg: string) => {
    console.log(type, msg);
}})

export const ReceiverDetailsContext = createContext({
    receiver: {id: "", username: "", profilePic: ""},
    changeReceiverDetails: (receiver: {id: string, username: string, profilePic: string}) => {console.log(receiver);}})
