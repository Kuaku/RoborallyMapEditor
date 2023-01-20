import MapRenderer from "../map_renderer/map_renderer";
import TileSelection from "../tile_selection/tile_selection";
import "./editor.css";
function Editor ({ map, changeTileRequest }) {

    return (<>
    <div className={"editor"}>
        <div className={"editor-map-area"}>
            <MapRenderer map={map} width={700} height={700} changeTileRequest={changeTileRequest}/>
        </div>
        <div className={"editor-selection-area"}>
            <TileSelection />
        </div>
    </div>
    </>)
}

export default Editor;