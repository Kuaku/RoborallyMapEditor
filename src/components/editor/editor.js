import MapRenderer from "../map_renderer/map_renderer";

function Editor ({ map }) {
    return (<>
    <MapRenderer map={map} width={600} height={600}/>
    </>)
}

export default Editor;