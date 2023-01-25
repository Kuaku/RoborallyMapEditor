import {TYPES as TYPE} from "../../model/selection";
import ObjectSelection from "../object_selection/object_selection";
import {useState} from "react";
import "./group_selection.css";

const GroupSelection = ({ group, type }) => {

    const [displayItems, setDisplayItems] = useState(false);

    const selection =  group.value.map((selection_object, i) => {
        switch (selection_object.type) {
            case TYPE.SELECTION_OBJECT: return (<ObjectSelection type={type}  i={i} object={selection_object}></ObjectSelection>);
            case TYPE.GROUP_OBJECT: return (<GroupSelection group={selection_object} type={type}></GroupSelection>);
            default: return (<></>);
        }
    });

    const pressed_header = (ev) => {
        ev.preventDefault();
        setDisplayItems(!displayItems);
    }


    return (<div className={"selection-group"}>
        <div className={"selection-group-header"} onClick={pressed_header}>
            <span>{displayItems ? "▼" : "▶"}</span>
            <span>{group.name}</span>
        </div>
        <div className={`selection-group-items display-${displayItems}`}>
            {
                selection
            }
        </div>
    </div>);
}

export default GroupSelection;