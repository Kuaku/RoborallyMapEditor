import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectionToImageKey} from "../../model/map";
import "./selection.css";

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
                            <img key={`${type}-selection-${i}`} alt={`tile ${JSON.stringify(selectionToImageKey(selection_object))} could not be loaded`} onDragStart={ev => {drag_start(ev, selection_object)}} draggable={true} src={images[selectionToImageKey(selection_object)]}></img>
                    );
                })
            }
    </div>
    )
}

export default Selection;