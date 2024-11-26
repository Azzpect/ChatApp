

export default function Menu() {
    return(
        <div id="menu" className="menu">
            <h3>Profile</h3>
            <h3>Friends</h3>
            <h3 onClick={() => {
                document.querySelector("#menu")?.classList.remove("active-menu")
            }}>LogOut</h3>
        </div>
    )
}