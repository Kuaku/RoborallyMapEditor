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
        <div className={"file_upload-container"}>
            <div className="file_upload">
                <input type="file" onChange={change_import_file}/>
                <i className="fa-solid fa-arrow-up"></i>
            </div>
        </div>
        <div className={"create_new_contianer"}>
            <button onClick={() => create_new_map_cb()}>create new</button>
        </div>
    </div>
    </>);
}

export default StartMenu;