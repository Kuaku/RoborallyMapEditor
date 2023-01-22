import "./toolbar.css";
import {useSelector} from "react-redux";
import {map_to_xml} from "../../model/map";

function Toolbar () {

    const map = useSelector((state) => state.map.value);

    const export_map = () => {
        const xml_string = map_to_xml(map);
        const file = new Blob([xml_string], {type: 'text/plain'});
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "gameboard-example.xml";
        element.click();
    }

    return (<div className={"toolbar"}>
        <button onClick={export_map}>Export</button>
    </div>)
}

export default Toolbar;