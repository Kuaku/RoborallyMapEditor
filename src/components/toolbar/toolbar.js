import "./toolbar.css";
import {useSelector, useDispatch} from "react-redux";
import {map_to_xml} from "../../model/map";
import {changeHeight, changeWidth} from "../../store/mapSlice";

function Toolbar () {

    const map = useSelector((state) => state.map.value);
    const dispatch = useDispatch();

    const export_map = () => {
        const xml_string = map_to_xml(map);
        const file = new Blob([xml_string], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "gameboard-example.xml";
        element.click();
    }

    const change_height = (ev) => {
        dispatch(changeHeight({height: ev.target.value}));
    }

    const change_width = (ev) => {
        dispatch(changeWidth({width: ev.target.value}));
    }

    return (<div className={"toolbar"}>
        <button onClick={export_map}>Export</button>
        <span>Height: </span>
        <input type={"number"} value={map.tiles.length} onChange={change_height}/>
        <span>Width: </span>
        <input type={"number"} value={map.tiles[0].length} onChange={change_width}/>
    </div>)
}

export default Toolbar;