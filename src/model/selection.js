import {tile_to_image_key} from "./tiles";
import {prop_to_image_key} from "./props";

const SELECTION_OBJECT_TYPES = {
    TILE: 0,
    PROP: 1,
}

const TYPES = {
    SELECTION_OBJECT: 0,
    GROUP_OBJECT: 1,
}


const create_selection_object = (value) => {
    return {
        type: TYPES.SELECTION_OBJECT,
        value,
    }
}

const create_selection_group = (name, ...value) => {
    return {
        name,
        type: TYPES.GROUP_OBJECT,
        value
    }
}

const selection_obj_to_image_key = (selection_object) => {
    switch (selection_object.type) {
        case SELECTION_OBJECT_TYPES.TILE: return tile_to_image_key(selection_object.object);
        case SELECTION_OBJECT_TYPES.PROP: return prop_to_image_key(selection_object.object);
        default: return "";
    }
}

export { SELECTION_OBJECT_TYPES, TYPES, selection_obj_to_image_key, create_selection_group, create_selection_object }