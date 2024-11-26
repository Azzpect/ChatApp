import React, { useState, useContext } from "react"
import { NotificationContext, UserContext } from "./contexts/AppContexts"
import FetchRes from "../types/FetchResType"


export default function Form() {

    const [formType, changeFormType] = useState(1)
    const {changeUser} = useContext(UserContext)
    const {changeNotification} = useContext(NotificationContext)
    let validUsername: boolean = true
    let validEmail: boolean = true
    let validPassword: boolean = true


    
    
    const signUp = () => {
        changeFormType(1)
    }
    const logIn = () => {
        changeFormType(2)
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!(validUsername && validEmail && validPassword)) {
            return
        }
        const formData = new FormData(e.target as HTMLFormElement)
        const formObj: {[key: string]: string} = {}
        formData.forEach((value, key) => {
            formObj[key] = value as string
        })
        try{
            let data: FetchRes
            if(formType === 1) {
                const res = await fetch("http://127.0.0.1:8080/create-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formObj)
                })
                data = await res.json()
                if(data.status === "error")
                    throw new Error(data.msg)
                changeNotification("success", data.msg)
            }
            else {
                const res = await fetch("http://127.0.0.1:8080/auth-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formObj)
                })
                data = await res.json()
                if(data.status === "error")
                    throw new Error(data.msg)
                changeNotification("success", data.msg)
            }
            localStorage.setItem("userId", data.userId as string)
            changeUser({isValidUser: true, userId: data.userId as string, username: data.username as string, profilePic: data.profilePic as string})

        }
        catch(err) {
            changeNotification("error", (err as Error).message)
        }
        finally {
            (e.target as HTMLFormElement).reset()
        }
    }

    const verifyUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const msgElement = e.target.parentElement?.childNodes[1] as HTMLParagraphElement
        msgElement.style.display = "block"
        if(val.length < 4) {
            msgElement.style.color = "red"
            validUsername = false
        }
        else {
            msgElement.style.display = "none"
            validUsername = true
        }
    }

    const verifyEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const msgElement = e.target.parentElement?.childNodes[1] as HTMLParagraphElement
        const emailPattern: RegExp = /^[^\s\W]+@[^\s\W\d]+\.com$/gm
        msgElement.style.display = "block"
        if(emailPattern.test(val)) {
            msgElement.style.display = "none"
            validEmail = true
        }
        else {
            msgElement.style.color = "red"
            validEmail = false
        }
    }

    const verifyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const len = e.target.parentElement?.childNodes[1] as HTMLParagraphElement
        const upper = e.target.parentElement?.childNodes[2] as HTMLParagraphElement
        const special = e.target.parentElement?.childNodes[3] as HTMLParagraphElement
        len.style.display = "block"
        upper.style.display = "block"
        special.style.display = "block"
        const upRegex = /[A-Z]+/
        const specialRegex = /\W/
        validPassword = val.length >= 8 && specialRegex.test(val) && upRegex.test(val)
        if(val.length < 8)
            len.style.color = "red"
        else
            len.style.display = "none"
        if(!specialRegex.test(val))
            special.style.color = "red"
        else
            special.style.display = "none"
        if(!upRegex.test(val))
            upper.style.color = "red"
        else
            upper.style.display = "none"
        
    }
    

    return (
        <>
        <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-10 py-14 bg-slate-800 rounded-3xl">
            { formType === 2 && 
            <>
            <h3 className="text-white text-3xl font-bold mb-2">LogIn</h3>
            <div className="auth-input-container">
                <input type="text" className="auth-input" name="username" id="" placeholder="Enter username" required/>
            </div>
            <div className="auth-input-container">
                <input type="password" className="auth-input" name="password" id="" placeholder="Enter password" required/>
            </div>
            <input type="submit" className="border-2 border-white p-2 text-lg rounded-lg text-white font-bold cursor-pointer" value="LogIn" />
            </>
            }
            { formType === 1 && 
            <>
            <h3 className="text-white text-3xl font-bold mb-2">SignUp</h3>
            <div className="auth-input-container">
                <input type="text" className="auth-input" name="username" id="" placeholder="Enter username" onChange={verifyUsername} required/>
                <p className="auth-input-error-text">minimum 4 characters</p>
            </div>
            <div className="auth-input-container">
                <input type="text" className="auth-input" name="email" id="" placeholder="Enter email" onChange={verifyEmail} required/>
                <p className="auth-input-error-text">invalid email address</p>
            </div>
            <div className="auth-input-container">
                <input type="password" className="auth-input" name="password" id="" placeholder="Enter password" onChange={verifyPassword} required/>
                <p className="auth-input-error-text">atleast 8 characters</p>
                <p className="auth-input-error-text">must have a uppercase character</p>
                <p className="auth-input-error-text">must have a special character</p>
            </div>
            <input type="submit" className="border-2 border-white p-2 text-lg rounded-lg text-white font-bold cursor-pointer" value="Create" />
            </>
            }
            {formType === 2 && <p className="text-white">Create an account.<button className="text-white font-bold" onClick={signUp}>SignUp</button></p>}
            {formType === 1 && <p className="text-white">Already have an account?<button className="text-white font-bold" onClick={logIn}>LogIn</button></p>}
        </form>
        </>
    )
}