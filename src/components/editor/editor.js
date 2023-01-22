import MapRenderer from "../map_renderer/map_renderer";
import "./editor.css";
import Selection from "../selection/selection";
import Toolbar from "../toolbar/toolbar";
import { ALL_TILES } from "../../model/tiles";
import {ALL_PROPS} from "../../model/props";
import {TYPES} from "../../model/selection";
function Editor ({ map, changeTileRequest }) {

    return (<>
    <div className={"editor"}>
        <div className={"editor-toolbar-area"}>
            <Toolbar />
        </div>
        <div className={"editor-map-area"}>
            <MapRenderer map={map} width={1000} height={1000} changeTileRequest={changeTileRequest}/>
        </div>
        <div className={"editor-tile-selection-area"}>
            <Selection type={TYPES.TILE} objects={ALL_TILES}/>
        </div>
        <div className={"editor-prop-selection-area"}>
            <Selection type={TYPES.PROP} objects={ALL_PROPS}/>
        </div>
    </div>
    </>)
}

export default Editor;