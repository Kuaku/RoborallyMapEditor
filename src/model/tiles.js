import {direction_to_string, DIRECTIONS, string_to_direction} from "./directions";
import {prop_to_xml, xml_prop_to_prop_obj} from "./props";
import {create_selection_group, create_selection_object} from "./selection";

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
    Jumper: 10,
    NormalMergeConveyorBelt: 11,
    ExpressMergeConveyorBelt: 12,
    NormalJoinConveyorBelt: 13,
    ExpressJoinConveyorBelt: 14,
    Portal: 15,
}

const TILES_SELECTION_GROUP = create_selection_group(
        "All Tiles",
        create_selection_object({
            tile_type: TILE_TYPES.OpenFloor
        }),
        create_selection_object({
            tile_type: TILE_TYPES.Pit
        }),
        create_selection_group(
                "Portal",
                create_selection_object({
                    tile_type: TILE_TYPES.Portal,
                    variant: "RED"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Portal,
                    variant: "BLUE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Portal,
                    variant: "BLACK"
                }),
        ),
        create_selection_group(
                "Jumper",
                create_selection_object({
                    tile_type: TILE_TYPES.Jumper
                }),
        ),
        create_selection_group(
                "Repair Site",
                create_selection_object({
                    tile_type: TILE_TYPES.RepairSite,
                    variant: "ONE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.RepairSite,
                    variant: "TWO"
                }),
        ),
        create_selection_group(
                "Flags",
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "ONE"
                                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "TWO"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "THREE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "FOUR"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "FIVE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "SIX"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "SEVEN"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Flag,
                    variant: "EIGHT"
                })
        ),
        create_selection_group(
                "Docks",
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "ONE"
                                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "TWO"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "THREE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "FOUR"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "FIVE"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "SIX"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "SEVEN"
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.Dock,
                    variant: "EIGHT"
                })
        ),
        create_selection_group(
                "Gear",
                create_selection_object({
                    tile_type: TILE_TYPES.Gear,
                    direction: DIRECTIONS.RIGHT
                }),
               create_selection_object({
                   tile_type: TILE_TYPES.Gear,
                   direction: DIRECTIONS.LEFT
               }),
       ),
        create_selection_group(
                "Normal Straight",
                create_selection_object({
                    tile_type: TILE_TYPES.NormalStraightConveyorBelt,
                    direction: DIRECTIONS.UP
                }),
               create_selection_object({
                   tile_type: TILE_TYPES.NormalStraightConveyorBelt,
                   direction: DIRECTIONS.DOWN
               }),
               create_selection_object({
                   tile_type: TILE_TYPES.NormalStraightConveyorBelt,
                   direction: DIRECTIONS.LEFT
               }),
               create_selection_object({
                   tile_type: TILE_TYPES.NormalStraightConveyorBelt,
                   direction: DIRECTIONS.RIGHT
               })
       ),
        create_selection_group(
                "Express Straight",
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
                    direction: DIRECTIONS.UP
                }),
               create_selection_object({
                   tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
                   direction: DIRECTIONS.DOWN
               }),
               create_selection_object({
                   tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
                   direction: DIRECTIONS.LEFT
               }),
               create_selection_object({
                   tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
                   direction: DIRECTIONS.RIGHT
               })
       ),
        create_selection_group(
                "Normal Turn",
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalTurnConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.LEFT
                }),
        ),
        create_selection_group(
                "Express Turn",
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.LEFT
                }),
            ),
            create_selection_group(
                "Normal Merge",
                create_selection_object({
                    tile_type: TILE_TYPES.NormalMergeConveyorBelt,
                    direction: DIRECTIONS.UP,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalMergeConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalMergeConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalMergeConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                })
                ),
            create_selection_group(
                "Express Merge",
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
                    direction: DIRECTIONS.UP,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                })
            ),
        create_selection_group(
                "Normal Join",
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.DOWN
                })
                ),
        create_selection_group(
                "Express Join",
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.UP,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.LEFT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.DOWN,
                    sourceDirection: DIRECTIONS.RIGHT
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.LEFT,
                    sourceDirection: DIRECTIONS.DOWN
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.UP
                }),
                create_selection_object({
                    tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                    direction: DIRECTIONS.RIGHT,
                    sourceDirection: DIRECTIONS.DOWN
                })
                )
);

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
            return `CONV_BELT_NORMAL_${direction_to_string(tile.direction)}_TURN_${direction_to_string(tile.sourceDirection)}`;
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
            return `CONV_BELT_EXPRESS_${direction_to_string(tile.direction)}_TURN_${direction_to_string(tile.sourceDirection)}`;
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

    {
        tile_type: TILE_TYPES.Jumper,
        tile_type_string: "Jumper",
        from_xml_tile: (_tile) => {
            return {
                tile_type: TILE_TYPES.Jumper,
            };
            },
        get_image_key: (_tile) => {
            return "JUMPER"
        },
    },
    {
        tile_type: TILE_TYPES.NormalMergeConveyorBelt,
        tile_type_string: "NormalMergeConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.NormalMergeConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
            };
            },
        get_image_key: (tile) => {
            return `CONV_BELT_NORMAL_${direction_to_string(tile.direction)}_MERGE`;
        },
    },
    {
        tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
        tile_type_string: "ExpressMergeConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.ExpressMergeConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
            };
            },
        get_image_key: (tile) => {
            return `CONV_BELT_EXPRESS_${direction_to_string(tile.direction)}_MERGE`;
            },
    },
    {
        tile_type: TILE_TYPES.NormalJoinConveyorBelt,
        tile_type_string: "NormalJoinConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.NormalJoinConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
                sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
            };
            },
        get_image_key: (tile) => {
            return `CONV_BELT_NORMAL_${direction_to_string(tile.direction)}_JOIN_${direction_to_string(tile.sourceDirection)}`;
            },
    },
    {
        tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
        tile_type_string: "ExpressJoinConveyorBelt",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.ExpressJoinConveyorBelt,
                direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
                sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
            };
            },
        get_image_key: (tile) => {
            return `CONV_BELT_EXPRESS_${direction_to_string(tile.direction)}_JOIN_${direction_to_string(tile.sourceDirection)}`;
            },
    },
    {
        tile_type: TILE_TYPES.Portal,
        tile_type_string: "Portal",
        from_xml_tile: (tile) => {
            return {
                tile_type: TILE_TYPES.Portal,
                variant: tile.getElementsByTagName("variant")[0].innerHTML,
            };
            },
        get_image_key: (tile) => {
            return `PORTAL_${tile.variant}`;
            },
        verification: (map, tile) => {
            return map.portal_dict[tile.variant].length === 2
        },
        extra_tags: (map, tile, parser, position) => {
            let target_position = map.portal_dict[tile.variant][0].row === position.row && map.portal_dict[tile.variant][0].col === position.col ? map.portal_dict[tile.variant][1] : map.portal_dict[tile.variant][0];
            parser.inline_tag("targetPosition", `${target_position.row},${target_position.col}`);
        }
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

const tile_to_xml = (tile, parser, map, position) => {
    let tile_type_obj = get_tile_type_obj(tile.tile_type);
    if (tile_type_obj.verification && !tile_type_obj.verification(map, tile)) {
        tile_to_xml({tile_type: TILE_TYPES.OpenFloor}, parser);
        return;
    }
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
    if (tile_type_obj.extra_tags) {
        tile_type_obj.extra_tags(map, tile, parser, position);
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

export { TILE_TYPES, get_tile_type_obj, string_to_tile_type_obj, tile_to_image_key, tile_to_xml, xml_tile_to_tile_obj, TILES_SELECTION_GROUP }