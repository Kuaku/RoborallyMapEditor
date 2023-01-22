import {tile_to_image_key} from "./tiles";
import {prop_to_image_key} from "./props";

const TYPES = {
    TILE: 0,
    PROP: 1,
}

const selection_obj_to_image_key = (selection_object) => {
    switch (selection_object.type) {
        case TYPES.TILE: return tile_to_image_key(selection_object.object);
        case TYPES.PROP: return prop_to_image_key(selection_object.object);
        default: return "";
    }
}

export { TYPES, selection_obj_to_image_key }