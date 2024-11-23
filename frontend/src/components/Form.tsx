import { useState } from "react"



export default function Form() {

    const [formType, changeFormType] = useState(1)
    
    const signUp = () => {
        changeFormType(1)
    }
    const logIn = () => {
        changeFormType(2)
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        console.log(formData);
    }
    

    return (
        <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-10 py-14 bg-slate-800 rounded-3xl">
            { formType === 1 && <h3 className="text-white text-3xl font-bold">SignUp</h3>}
            { formType === 2 && <h3 className="text-white text-3xl font-bold">LogIn</h3>}
            <input type="text" className="auth-input" name="username" id="" placeholder="Enter username" required/>
            { formType === 1 && <input type="email" className="auth-input" name="email" id="" placeholder="Enter email" required/>}
            <input type="password" className="auth-input" name="password" id="" placeholder="Enter password" required/>
            <input type="submit" className="border-2 border-white p-2 text-lg rounded-lg text-white font-bold" value="Submit" />
            {formType === 2 && <p>Create an account.<button onClick={signUp}>SignUp</button></p>}
            {formType === 1 && <p>Already have an account?<button onClick={logIn}>LogIn</button></p>}
        </form>
    )
}