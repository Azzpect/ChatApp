



export default function Menu() {

    const menuItemClicked = new CustomEvent("menuItemClicked");

    return(
        <div className="menu">
            <h3 onClick={() => {
                document.querySelector(".profile")?.classList.toggle("active-profile")
                document.querySelector(".friends-section")?.classList.remove("active-friends-section")
                document.querySelector(".menu")?.classList.remove("active-menu");
                document.dispatchEvent(menuItemClicked);
            }}>Profile</h3>
            <h3 onClick={() => {
                document.querySelector(".profile")?.classList.remove("active-profile")
                document.querySelector(".friends-section")?.classList.toggle("active-friends-section")
                document.querySelector(".menu")?.classList.remove("active-menu");
                document.dispatchEvent(menuItemClicked);
            }}>Friends</h3>
            <h3 onClick={() => {
                document.querySelector(".menu")?.classList.remove("active-menu")
                document.querySelector(".profile")?.classList.remove("active-profile")
                document.querySelector(".friends-section")?.classList.remove("active-friends-section")
                localStorage.removeItem("userId")
                window.location.reload()
            }}>LogOut</h3>
        </div>
    )
}