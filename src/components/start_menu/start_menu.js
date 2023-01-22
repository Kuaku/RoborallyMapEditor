import "./start_menu.css";

function StartMenu ({create_new_map_cb, open_map_cb}) {

    const change_import_file = (ev) => {
        let file = ev.target.files[0];
        let reader = new FileReader();
        reader.onload = (ev) => {
            open_map_cb(ev.target.result);
        }
        reader.readAsText(file);
    }

    return (<>
        <div className={"start_menu_container"}>
            <input type={"file"} onChange={change_import_file}/>
            <span>or</span>
            <button onClick={() => create_new_map_cb()}>create new</button>
        </div>
    </>);
}

export default StartMenu;