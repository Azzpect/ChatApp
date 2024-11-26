import { createContext, ReactNode } from "react";


export interface ProviderPropType {
    children: ReactNode
}


export const UserContext = createContext({isValidUser: false, changeValidUser: (value: boolean) => {console.log(value);}})

export const NotificationContext = createContext({notification: {type: "", msg: ""}, changeNotification: (type: string, msg: string) => {
    console.log(type, msg);
}})
