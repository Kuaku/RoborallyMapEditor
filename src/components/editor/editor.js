import MapRenderer from "../map_renderer/map_renderer";
import "./editor.css";
import Selection from "../selection/selection";
import {ALL_PROPS, TYPES} from "../../model/map";
import Toolbar from "../toolbar/toolbar";
import { ALL_TILES } from "../../model/tiles";
function Editor ({ map, changeTileRequest }) {

    return (<>
    <div className={"editor"}>
        <div className={"editor-toolbar-area"}>
            <Toolbar />
        </div>
        <div className={"editor-map-area"}>
            <MapRenderer map={map} width={700} height={700} changeTileRequest={changeTileRequest}/>
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