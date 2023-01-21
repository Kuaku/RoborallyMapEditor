import "./start_menu.css";

function StartMenu ({create_new_map_cb}) {
    return (<>
        <div className={"start_menu_container"}>
            <input type={"file"} />
            <span>or</span>
            <button onClick={() => create_new_map_cb()}>create new</button>
        </div>
    </>);
}

export default StartMenu;