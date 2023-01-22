import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import "./selection.css";
import {selection_obj_to_image_key} from "../../model/selection";

function Selection ({objects, type}) {
    const images = useSelector((state) => state.images.value);

    const [selection_objects, setSelectionObjects] = useState(undefined);

    const drag_start = (ev, selection_object) => {
        ev.dataTransfer.setData("text", JSON.stringify(selection_object));
    }

    useEffect(() => {
        setSelectionObjects(
                objects.map((object) => {
                    return {
                        type,
                        object
                    }
                })
        );
    }, [objects, type])

    if (!images || !selection_objects) {
        return (<></>);
    }

    return (<div className={"selection"}>
            {
                selection_objects.map((selection_object, i) => {
                    return (
                            <img key={`${type}-selection-${i}`} alt={`tile ${JSON.stringify(selection_obj_to_image_key(selection_object))} could not be loaded`} onDragStart={ev => {drag_start(ev, selection_object)}} draggable={true} src={images[selection_obj_to_image_key(selection_object)]}></img>
                    );
                })
            }
    </div>
    )
}

export default Selection;