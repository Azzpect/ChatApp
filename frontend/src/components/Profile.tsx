import React, { useContext, useEffect, useState } from "react"
import { LoaderContext, NotificationContext, UserContext } from "./contexts/AppContexts"
import edit from "../assets/edit.svg"


export default function Profile() {

    const {user, changeUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)
    const {changeLoading} = useContext(LoaderContext)

    const [tempUser, setTempUser] = useState({...user, profilePicFile: new File([],"")})

    useEffect(() => {
        setTempUser({...user, profilePicFile: new File([],"")})
    }, [user])


    const updateUserDetails = async () => {
        try {
            changeLoading(true)
            const formData = new FormData()
            formData.append("userId", tempUser.userId)
            formData.append("username", tempUser.username)
            if(tempUser.profilePicFile.size !== 0)
                formData.append("profilePic", tempUser.profilePicFile)
            else
                formData.append("profilePic", tempUser.profilePic)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/update-user`, {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if(data.status === "error")
                throw new Error(data.msg)
            changeNotification("success", data.msg)
            changeUser(tempUser)
        }
        catch(err) {
            changeNotification("error", (err as Error).message)
        }
        finally {
            changeLoading(false)
        }
    }

    const deleteAccount = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/delete-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.userId
                })
            })
            const data = await res.json()
            if(data.status === "error")
                throw new Error(data.msg)
            window.location.reload()
        }
        catch(err) {
            changeNotification("error", (err as Error).message)
        }
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempUser({...tempUser, username: e.target.value})
    }

    return(
        <div className="profile">
            <div className="relative w-full flex justify-center">
                <img id="profilePic" src={tempUser.profilePic} alt="" className="rounded-full w-3/4"/>
                <img src={edit} onClick={() => {
                    const filePicker = document.querySelector("#filePicker") as HTMLInputElement
                    filePicker.click()
                }} alt="" className="absolute w-5 top-2 right-5 cursor-pointer"/>
                <input type="file" name="" id="filePicker" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                    if(e.target.files == null)
                        return

                    const file = e.target.files[0]

                    const reader = new FileReader()
                    console.log(tempUser.profilePicFile.size);

                    reader.addEventListener("load", (e) => {
                        setTempUser({...tempUser, profilePic: (e.target?.result as string), profilePicFile: file})
                    })

                    reader.readAsDataURL(file)
                    
                }}/>
            </div>
            <div className="relative flex justify-center mt-5">
                <input type="text" id="username" value={tempUser.username} onChange={handleUsername} onBlur={(e: React.ChangeEvent) => {
                    e.target.setAttribute("readOnly", "true")
                }} readOnly className="bg-transparent text-center outline-none text-white font-semibold"/>
                <img onClick={() => {
                    const input = document.querySelector("#username") as HTMLInputElement
                    input?.removeAttribute("readOnly")
                    input.focus()
                }} src={edit} alt="" className="absolute w-5 right-0 top-0 cursor-pointer"/>
            </div>
            <button className="bg-white font-semibold px-5 py-2 rounded-xl mt-5" onClick={updateUserDetails}>Save</button>
            <button className="bg-red-500 text-white font-semibold px-5 py-2 rounded-xl mt-5" onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}