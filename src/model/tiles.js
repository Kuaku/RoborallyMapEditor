import {direction_to_string, DIRECTIONS, string_to_direction} from "./directions";
import {prop_to_xml, xml_prop_to_prop_obj} from "./props";

const TILE_TYPES = {
    OpenFloor: 0,
    Gear: 1,
    NormalStraightConveyorBelt: 2,
    ExpressStraightConveyorBelt: 3,
    NormalTurnConveyorBelt: 4,
    ExpressTurnConveyorBelt: 5,
    Pit: 6,
    Flag: 7,
    Dock: 8,
    RepairSite: 9,
}

const ALL_TILES = [
    {
        tile_type: TILE_TYPES.OpenFloor
    },
    {
        tile_type: TILE_TYPES.Pit
    },
    {
        tile_type: TILE_TYPES.RepairSite,
        variant: "ONE"
    },
    {
        tile_type: TILE_TYPES.RepairSite,
        variant: "TWO"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "ONE"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "TWO"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "THREE"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "FOUR"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "FIVE"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "SIX"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "SEVEN"
    },
    {
        tile_type: TILE_TYPES.Flag,
        variant: "EIGHT"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "ONE"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "TWO"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "THREE"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "FOUR"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "FIVE"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "SIX"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "SEVEN"
    },
    {
        tile_type: TILE_TYPES.Dock,
        variant: "EIGHT"
    },
    {
        tile_type: TILE_TYPES.Gear,
        direction: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.Gear,
        direction: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.NormalStraightConveyorBelt,
        direction: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.NormalStraightConveyorBelt,
        direction: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.NormalStraightConveyorBelt,
        direction: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.NormalStraightConveyorBelt,
        direction: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
        direction: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
        direction: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
        direction: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
        direction: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.RIGHT,
        sourceDirection: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.LEFT,
        sourceDirection: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.RIGHT,
        sourceDirection: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.LEFT,
        sourceDirection: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.DOWN,
        sourceDirection: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.DOWN,
        sourceDirection: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.UP,
        sourceDirection: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        direction: DIRECTIONS.UP,
        sourceDirection: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.RIGHT,
        sourceDirection: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.LEFT,
        sourceDirection: DIRECTIONS.DOWN
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.RIGHT,
        sourceDirection: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.LEFT,
        sourceDirection: DIRECTIONS.UP
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.DOWN,
        sourceDirection: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.DOWN,
        sourceDirection: DIRECTIONS.LEFT
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.UP,
        sourceDirection: DIRECTIONS.RIGHT
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        direction: DIRECTIONS.UP,
        sourceDirection: DIRECTIONS.LEFT
    }
];

const TILE_TYPES_OBJS = [
    {
        tile_type: TILE_TYPES.OpenFloor,
        tile_type_string: "OpenFloor",
        from_xml_tile: (_tile) => {
            return {
                tile_type: TILE_TYPES.OpenFloor,
            };
        },
        get_image_key: (_tile) => {
            return "OPEN_FLOOR"
        },
    },
    {
        tile_type: TILE_TYPES.Gear,
        tile_type_string: "Gear",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.Gear,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
            };
        },
        get_image_key: (tile) => {
            return `GEAR_${direction_to_string(tile.direction)}`;
        },
    },
    {
        tile_type: TILE_TYPES.NormalStraightConveyorBelt,
        tile_type_string: "NormalStraightConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.NormalStraightConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
            };
        },
        get_image_key: (tile) => {
            return `CONV_BELT_NORMAL_${direction_to_string(tile.direction)}_STRAIGHT`;
        },
    },
    {
        tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
        tile_type_string: "ExpressStraightConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
            };
        },
        get_image_key: (tile) => {
            return `CONV_BELT_EXPRESS_${direction_to_string(tile.direction)}_STRAIGHT`;
        },
    },
    {
        tile_type: TILE_TYPES.NormalTurnConveyorBelt,
        tile_type_string: "NormalTurnConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
                sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
            };
        },
        get_image_key: (tile) => {
            return `CONV_BELT_NORMAL_${direction_to_string(tile.sourceDirection)}_TURN_${direction_to_string(tile.direction)}`;
        },
    },
    {
        tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
        tile_type_string: "ExpressTurnConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
                sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
            };
        },
        get_image_key: (tile) => {
            return `CONV_BELT_EXPRESS_${direction_to_string(tile.sourceDirection)}_TURN_${direction_to_string(tile.direction)}`;
        },
    },
    {
        tile_type: TILE_TYPES.Pit,
        tile_type_string: "Pit",
        from_xml_tile: (_tile) => {
            return {
                tile_type: TILE_TYPES.Pit,
            };
        },
        get_image_key: (_tile) => {
            return "PIT"
        },
    },
    {
        tile_type: TILE_TYPES.Flag,
        tile_type_string: "Flag",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.Flag,
                variant: tile.getElementsByTagName("variant")[0].innerHTML,
            };
        },
        get_image_key: (tile) => {
            return `FLAG_${tile.variant}`;
        },
    },
    {
        tile_type: TILE_TYPES.Dock,
        tile_type_string: "Dock",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.Dock,
                variant: tile.getElementsByTagName("variant")[0].innerHTML,
            };
        },
        get_image_key: (tile) => {
            return `DOCK_${tile.variant}`;
        },
    },
    {
        tile_type: TILE_TYPES.RepairSite,
        tile_type_string: "RepairSite",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.RepairSite,
                variant: tile.getElementsByTagName("variant")[0].innerHTML,
            };
        },
        get_image_key:   (tile) => {
            return `REPAIR_SITE_${tile.variant}`;
        },
    },
]

const tile_to_image_key = (tile) => {
    return get_tile_type_obj(tile.tile_type).get_image_key(tile);
}

const get_tile_type_obj = (tile_type) => {
    for (let i = 0; i < TILE_TYPES_OBJS.length; i++) {
        if (TILE_TYPES_OBJS[i].tile_type === tile_type) {
            return TILE_TYPES_OBJS[i];
        }
    }
    return undefined;
}

const string_to_tile_type_obj = (tile_type_string) => {
    for (let i = 0; i < TILE_TYPES_OBJS.length; i++) {
        if (TILE_TYPES_OBJS[i].tile_type_string === tile_type_string) {
            return TILE_TYPES_OBJS[i];
        }
    }
    return undefined;
}

const tile_to_xml = (tile, parser) => {
    parser.open_tag("tile");
    parser.inline_tag("tileType", get_tile_type_obj(tile.tile_type).tile_type_string);
    if (tile.variant !== undefined) {
        parser.inline_tag("variant", tile.variant);
    }
    if (tile.direction !== undefined) {
        parser.inline_tag("direction", direction_to_string(tile.direction));
    }
    if (tile.sourceDirection !== undefined) {
        parser.inline_tag("sourceDirection", direction_to_string(tile.sourceDirection));
    }
    if (tile.props && Object.entries(tile.props).length > 0) {
        parser.open_tag("props");
        for (let prop in tile.props) {
            prop_to_xml(tile.props[prop], parser);
        }
        parser.close_tag();
    }
    parser.close_tag();
}

const xml_tile_to_tile_obj = (tile) => {
    const tile_type_obj = string_to_tile_type_obj(tile.getElementsByTagName("tileType")[0].innerHTML);
    const tile_obj = tile_type_obj.from_xml_tile(tile);
    const props = tile.getElementsByTagName("props")[0];

    if (props !== undefined && props.children.length > 0) {
        tile_obj.props = {};
        for (let i = 0; i < props.children.length; i++) {
            const prop = props.children[i];
            const prop_obj = xml_prop_to_prop_obj(prop);
            tile_obj.props[string_to_direction(prop.tagName)] = prop_obj;
        }
    }
    return tile_obj;
}

export { TILE_TYPES, ALL_TILES, get_tile_type_obj, string_to_tile_type_obj, tile_to_image_key, tile_to_xml, xml_tile_to_tile_obj }