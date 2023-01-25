import {direction_to_string, DIRECTIONS, string_to_direction} from "./directions";
import {create_selection_group, create_selection_object} from "./selection";

const PROP_TYPES = {
    Wall: 0,
    LaserBeam: 1,
}

const PROPS_SELECTION_GROUP = create_selection_group(
        "All Props",
         create_selection_group(
                 "Walls",
                 create_selection_object({
                     prop_type: PROP_TYPES.Wall,
                     position: DIRECTIONS.UP
                 }),
                create_selection_object({
                    prop_type: PROP_TYPES.Wall,
                    position: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.Wall,
                    position: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.Wall,
                    position: DIRECTIONS.RIGHT
                }),
         ),
        create_selection_group(
                "One Laser",
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.UP,
                    variant: "ONE"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.LEFT,
                    variant: "ONE"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.DOWN,
                    variant: "ONE"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.RIGHT,
                    variant: "ONE"
                }),
        ),
        create_selection_group(
                "Two Lasers",
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.UP,
                    variant: "TWO"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.LEFT,
                    variant: "TWO"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.DOWN,
                    variant: "TWO"
                }),
                create_selection_object({
                    prop_type: PROP_TYPES.LaserBeam,
                    position: DIRECTIONS.RIGHT,
                    variant: "TWO"
                })
        ),
)

const PROP_TYPES_OBJS = [
    {
        prop_type: PROP_TYPES.Wall,
        prop_type_string: "Wall",
        from_xml_tile: (prop) => {
            return {
                prop_type: PROP_TYPES.Wall,
                position: string_to_direction(prop.tagName),
            }
        },
        get_image_key: (prop) => {
            return `WALL_NONE_${direction_to_string(prop.position)}`;
            },
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        prop_type_string: "LaserBeam",
        from_xml_tile: (prop) => {
            return {
                prop_type: PROP_TYPES.LaserBeam,
                position: string_to_direction(prop.tagName),
                variant: prop.getElementsByTagName("variant")[0].innerHTML,
            }
        },
        get_image_key: (prop) => {
            return `LASER_BEAM_${prop.variant}_ALL_${direction_to_string(prop.position)}`
        }
    },

]

const prop_to_image_key = (prop) => {
    return get_prop_type_obj(prop.prop_type).get_image_key(prop);
}
const get_prop_type_obj = (prop_type) => {
    for (let i = 0; i < PROP_TYPES_OBJS.length; i++) {
        if (PROP_TYPES_OBJS[i].prop_type === prop_type) {
            return PROP_TYPES_OBJS[i];
        }
    }
    return undefined;
}

const string_to_prop_type_obj = (prop_type_string) => {
    for (let i = 0; i < PROP_TYPES_OBJS.length; i++) {
        if (PROP_TYPES_OBJS[i].prop_type_string === prop_type_string) {
            return PROP_TYPES_OBJS[i];
        }
    }
    return undefined;
}

const prop_to_xml = (prop, parser) => {
    switch (prop.position) {
        case DIRECTIONS.UP: parser.open_tag("up"); break;
        case DIRECTIONS.DOWN: parser.open_tag("down"); break;
        case DIRECTIONS.LEFT: parser.open_tag("left"); break;
        case DIRECTIONS.RIGHT: parser.open_tag("right"); break;
        default: break;
    }
    parser.inline_tag("propType", get_prop_type_obj(prop.prop_type).prop_type_string);
    if (prop.variant) {
        parser.inline_tag("variant", prop.variant);
    }
    switch (prop.prop_type) {
        case PROP_TYPES.LaserBeam: parser.inline_tag("activationPhases", "ALL"); break;
        default: parser.inline_tag("activationPhases", "NONE"); break;
    }
    parser.close_tag();
}

const xml_prop_to_prop_obj = (prop) => {
    const prop_type_obj = string_to_prop_type_obj(prop.getElementsByTagName("propType")[0].innerHTML);
    return prop_type_obj.from_xml_tile(prop);
}

export { PROP_TYPES, PROPS_SELECTION_GROUP, get_prop_type_obj, string_to_prop_type_obj, prop_to_image_key, prop_to_xml, xml_prop_to_prop_obj }