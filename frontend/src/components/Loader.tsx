import logo from "../assets/chat.svg"

export default function Loader() {
    return (
        <div className="absolute w-screen h-screen flex justify-center items-center z-20 bg-black">
            <div className="absolute w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black animate-loader"></div>
            <img src={logo} alt="" className="w-24 h-24"/>
        </div>
    )
}