import "./selection.css";
import GroupSelection from "../group_selection/group_selection";

function Selection ({objects, type}) {
    return (<div className={"selection"}>
        <GroupSelection group={objects} type={type}></GroupSelection>
    </div>
    )
}

export default Selection;