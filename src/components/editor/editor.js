import MapRenderer from "../map_renderer/map_renderer";
import TileSelection from "../tile_selection/tile_selection";

function Editor ({ map, changeTileRequest }) {

    return (<>
    <MapRenderer map={map} width={600} height={600} changeTileRequest={changeTileRequest}/>
    <TileSelection />
    </>)
}

export default Editor;