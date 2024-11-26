import { createContext, ReactNode } from "react";


export interface ProviderPropType {
    children: ReactNode
}

export type User = {
    isValidUser: boolean,
    username: string,
    userId: string,
    profilePic: string
}


export const UserContext = createContext({user: {isValidUser: false, username: "", userId: "", profilePic: ""}, changeUser: (value: User) => {console.log(value);}})

export const NotificationContext = createContext({notification: {type: "", msg: ""}, changeNotification: (type: string, msg: string) => {
    console.log(type, msg);
}})
