import {useSelector} from "react-redux";
import {selection_obj_to_image_key} from "../../model/selection";

const ObjectSelection = ({ object, type, i }) => {
    const images = useSelector((state) => state.images.value);
    const drag_start = (ev, selection_object) => {
        ev.dataTransfer.setData("text", JSON.stringify(selection_object));
    }
    return (<img key={`${type}-selection-${i}`}
                alt={`tile ${JSON.stringify(selection_obj_to_image_key({type, object: object.value}))} could not be loaded`}
                onDragStart={ev => {drag_start(ev, {type, object: object.value})}}
                draggable={true}
                src={images[selection_obj_to_image_key({type, object: object.value})]}>
    </img>);
}

export default ObjectSelection;