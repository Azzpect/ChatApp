import userIcon from "../assets/userIcon.svg"

export default function Navbar() {
    return (
        <nav className="bg-slate-800 p-4 flex justify-between">
            <h1 className="primary-heading">ChatAPP</h1>
            <img src={userIcon} alt="" className="w-8"/>
        </nav>
    )
}