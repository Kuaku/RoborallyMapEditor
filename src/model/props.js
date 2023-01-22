import {direction_to_string, DIRECTIONS, string_to_direction} from "./directions";

const PROP_TYPES = {
    Wall: 0,
    LaserBeam: 1,
}

const ALL_PROPS = [
    {
        prop_type: PROP_TYPES.Wall,
        position: DIRECTIONS.UP
    },
    {
        prop_type: PROP_TYPES.Wall,
        position: DIRECTIONS.LEFT
    },
    {
        prop_type: PROP_TYPES.Wall,
        position: DIRECTIONS.DOWN
    },
    {
        prop_type: PROP_TYPES.Wall,
        position: DIRECTIONS.RIGHT
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.UP,
        variant: "ONE"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.LEFT,
        variant: "ONE"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.DOWN,
        variant: "ONE"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.RIGHT,
        variant: "ONE"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.UP,
        variant: "TWO"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.LEFT,
        variant: "TWO"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.DOWN,
        variant: "TWO"
    },
    {
        prop_type: PROP_TYPES.LaserBeam,
        position: DIRECTIONS.RIGHT,
        variant: "TWO"
    }
]
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

export { PROP_TYPES, ALL_PROPS, get_prop_type_obj, string_to_prop_type_obj, prop_to_image_key }