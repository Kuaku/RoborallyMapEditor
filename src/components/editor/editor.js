import MapRenderer from "../map_renderer/map_renderer";
import "./editor.css";
import Selection from "../selection/selection";
import Toolbar from "../toolbar/toolbar";
import {TILES_SELECTION_GROUP} from "../../model/tiles";
import {PROPS_SELECTION_GROUP} from "../../model/props";
import {SELECTION_OBJECT_TYPES} from "../../model/selection";
function Editor ({ changeTileRequest }) {

    return (<>
    <div className={"editor"}>
        <div className={"editor-toolbar-area"}>
            <Toolbar />
        </div>
        <div className={"editor-map-area"}>
            <MapRenderer changeTileRequest={changeTileRequest}/>
        </div>
        <div className={"editor-tile-selection-area"}>
            <Selection type={SELECTION_OBJECT_TYPES.TILE} objects={TILES_SELECTION_GROUP}/>
        </div>
        <div className={"editor-prop-selection-area"}>
            <Selection type={SELECTION_OBJECT_TYPES.PROP} objects={PROPS_SELECTION_GROUP}/>
        </div>
    </div>
    </>)
}

export default Editor;