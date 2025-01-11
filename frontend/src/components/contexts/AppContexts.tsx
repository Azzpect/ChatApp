import { createContext, ReactNode } from "react";


export interface ProviderPropType {
    children: ReactNode
}



export const UserContext = createContext({user: {username: "", userId: "", profilePic: ""}, changeUser: (value: {username: string, userId: string, profilePic: string}) => {console.log(value);}})

export const NotificationContext = createContext({notification: {type: "", msg: ""}, changeNotification: (type: string, msg: string) => {
    console.log(type, msg);
}})

export const ReceiverDetailsContext = createContext({
    receiver: {id: "", username: "", profilePic: ""},
    changeReceiverDetails: (receiver: {id: string, username: string, profilePic: string}) => {console.log(receiver);}})

export const LoaderContext = createContext({loading: false, changeLoading: (value: boolean) => {console.log(value);}})
