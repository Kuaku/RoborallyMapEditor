import "./start_menu.css";

function StartMenu () {
    return (<>
        <div className={"start_menu_container"}>
            <input type={"file"} />
            <span>or</span>
            <button>Create new</button>
        </div>
    </>);
}

export default StartMenu;