import { useState } from "react";
import { ProviderPropType } from "./AppContexts";
import { LoaderContext } from "./AppContexts";


export default function LoaderContextProvider({children}: ProviderPropType) {
    const [loading, setLoading] = useState(true)

    const changeLoading = (value: boolean) => {setLoading(value)}

    return (
        <LoaderContext.Provider value={{loading, changeLoading}}>
            {children}
        </LoaderContext.Provider>
    )
}