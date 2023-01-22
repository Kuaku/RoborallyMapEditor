const STANDARD_SIZE = {width: 12, height: 16};

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

const TILE_TYPE_STRING = [
    "OpenFloor",
    "Gear",
    "NormalStraightConveyorBelt",
    "ExpressStraightConveyorBelt",
    "NormalTurnConveyorBelt",
    "ExpressTurnConveyorBelt",
    "Pit",
    "Flag",
    "Dock",
    "RepairSite"
]

const string_to_tile_type = (tileType) => {
    for (let i = 0; i < TILE_TYPE_STRING.length; i++) {
        if (TILE_TYPE_STRING[i] === tileType) {
            return i;
        }
    }
    return -1;
}

const string_to_prop_type = (propType) => {
    for (let i = 0; i < PROP_TYPE_STRING.length; i++) {
        if (PROP_TYPE_STRING[i] === propType) {
            return i;
        }
    }
    return -1;
}

const xml_tile_to_tile_obj = (tile) => {
    const tile_type = string_to_tile_type(tile.getElementsByTagName("tileType")[0].innerHTML);
    const tile_obj = initTileType[tile_type](tile);
    const props = tile.getElementsByTagName("props")[0];

    if (props !== undefined && props.children.length > 0) {
        tile_obj.props = {};
        for (let i = 0; i < props.children.length; i++) {
            const prop = props.children[i];
            const prop_type = string_to_prop_type(prop.getElementsByTagName("propType")[0].innerHTML);
            tile_obj.props[string_to_direction(prop.tagName)] = initPropType[prop_type](prop);
        }
    }
    return tile_obj;
}

const PROP_TYPES = {
    Wall: 0,
    LaserBeam: 1,
}

const PROP_TYPE_STRING = [
    "Wall",
    "LaserBeam",
]

const directionToString = (direction) => {
    switch (direction) {
        case DIRECTIONS.UP: return  "UP";
        case DIRECTIONS.DOWN: return  "DOWN";
        case DIRECTIONS.LEFT: return  "LEFT";
        case DIRECTIONS.RIGHT: return "RIGHT";
        default: return "";
    }
}

const string_to_direction = (str_direction) => {
    switch (str_direction.toUpperCase()) {
        case "UP": return DIRECTIONS.UP;
        case "DOWN": return DIRECTIONS.DOWN;
        case "LEFT": return DIRECTIONS.LEFT;
        case "RIGHT": return DIRECTIONS.RIGHT;
        default: return -1;
    }
}

const is_position_in_map = (map, position) => {
    return position.row >= 0 && position.row < map.tiles.length && position.col >= 0 && position.col < map.tiles[0].length;
}

const enumerate_map = (map, cb) => {
    map.tiles.forEach((row_obj, row) => {
        row_obj.forEach((tile, col) => {
            cb(tile, col, row);
        })
    })
}

const getImageKeysProp = [
    //Wall
    (prop) => {
        return `WALL_NONE_${directionToString(prop.position)}`;
    },
    //LaserBeam
    (prop) => {
        return `LASER_BEAM_${prop.variant}_ALL_${directionToString(prop.position)}`
    }
]
const initPropType = [
    //Wall
    (prop) => {
        return {
            prop_type: PROP_TYPES.Wall,
            position: string_to_direction(prop.tagName),
        }
    },
    //LaserBeam
    (prop) => {
        return {
            prop_type: PROP_TYPES.LaserBeam,
            position: string_to_direction(prop.tagName),
            variant: prop.getElementsByTagName("variant")[0].innerHTML,
        }
    }
]

const initTileType = [
    //OpenFloor
    (_tile) => {
        return {
            tile_type: TILE_TYPES.OpenFloor
        };
    },
    //Gear
    (tile) => {
        return {
            tile_type: TILE_TYPES.Gear,
            direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
        };
    },
    //NormalStraightConveyorBelt
    (tile) => {
        return {
            tile_type: TILE_TYPES.NormalStraightConveyorBelt,
            direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
        };
    },
    //ExpressStraightConveyorBelt
    (tile) => {
        return {
            tile_type: TILE_TYPES.ExpressStraightConveyorBelt,
            direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML)
        };
    },
    //NormalTurnConveyorBelt
    (tile) => {
        return {
            tile_type: TILE_TYPES.NormalTurnConveyorBelt,
            direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
            sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
        };
    },
    //ExpressTurnConveyorBelt
    (tile) => {
        return {
            tile_type: TILE_TYPES.ExpressTurnConveyorBelt,
            direction: string_to_direction(tile.getElementsByTagName("direction")[0].innerHTML),
            sourceDirection: string_to_direction(tile.getElementsByTagName("sourceDirection")[0].innerHTML)
        };
    },
    //Pit
    (_tile) => {
        return {
            tile_type: TILE_TYPES.Pit,
        };
    },
    //Flag
    (tile) => {
        return {
            tile_type: TILE_TYPES.Flag,
            variant: tile.getElementsByTagName("variant")[0].innerHTML,
        };
    },
    //Dock
    (tile) => {
        return {
            tile_type: TILE_TYPES.Dock,
            variant: tile.getElementsByTagName("variant")[0].innerHTML,
        };
    },
    //RepairSite
    (tile) => {
        return {
            tile_type: TILE_TYPES.RepairSite,
            variant: tile.getElementsByTagName("variant")[0].innerHTML,
        };
    },
]

const getImageKeysTile = [
    //OpenFloor
    (_tile) => {
        return "OPEN_FLOOR"
    },
    //Gear
    (tile) => {
        return `GEAR_${directionToString(tile.direction)}`;
    },
    //NormalStraightConveyorBelt
    (tile) => {
        return `CONV_BELT_NORMAL_${directionToString(tile.direction)}_STRAIGHT`;
    },
    //ExpressStraightConveyorBelt
    (tile) => {
        return `CONV_BELT_EXPRESS_${directionToString(tile.direction)}_STRAIGHT`;
    },
    //NormalTurnConveyorBelt
    (tile) => {
        return `CONV_BELT_NORMAL_${directionToString(tile.sourceDirection)}_TURN_${directionToString(tile.direction)}`;
    },
    //ExpressTurnConveyorBelt
    (tile) => {
        return `CONV_BELT_EXPRESS_${directionToString(tile.sourceDirection)}_TURN_${directionToString(tile.direction)}`;
    },
    //Pit
    (_tile) => {
        return "PIT";
    },
    //Flag
    (tile) => {
        return `FLAG_${tile.variant}`;
    },
    //Dock
    (tile) => {
        return `DOCK_${tile.variant}`;
        },
    //RepairSote
    (tile) => {
        return `REPAIR_SITE_${tile.variant}`;
    },
]

const DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
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

const create_new_map = () => {
    const tiles = [];
    for (let i = 0; i < STANDARD_SIZE.height; i++) {
        tiles.push([]);
        for (let j = 0; j < STANDARD_SIZE.width; j++) {
            tiles[i].push(create_new_tile());
        }
    }

    return {
        tiles,
    }
}

const tileTypeToImageKey = (tile) => {
    return getImageKeysTile[tile.tile_type](tile);
}

const propTypeToImageKey = (prop) => {
    return getImageKeysProp[prop.prop_type](prop);
}

const TYPES = {
    TILE: 0,
    PROP: 1,
}

const selectionToImageKey = (selection_object) => {
    switch (selection_object.type) {
        case TYPES.TILE: return tileTypeToImageKey(selection_object.object);
        case TYPES.PROP: return propTypeToImageKey(selection_object.object);
        default: return "";
    }
}

const create_new_tile = () => {
    return {
        tile_type: TILE_TYPES.OpenFloor
    }
}

const prop_to_xml = (prop, indent) => {
    let xml_out = ``;
    indent += `\t`;
    switch (prop.position) {
        case DIRECTIONS.UP: xml_out += `${indent}<up>\n`; break;
        case DIRECTIONS.DOWN: xml_out += `${indent}<down>\n`; break;
        case DIRECTIONS.LEFT: xml_out += `${indent}<left>\n`; break;
        case DIRECTIONS.RIGHT: xml_out += `${indent}<right>\n`; break;
        default: break;
    }

    indent += `\t`;
    xml_out += `${indent}<propType>${PROP_TYPE_STRING[prop.prop_type]}</propType>\n`;
    if (prop.variant) {
        xml_out += `${indent}<variant>${prop.variant}</variant>\n`;
    }
    switch (prop.prop_type) {
        case PROP_TYPES.LaserBeam: xml_out += `${indent}<activationPhases>ALL</activationPhases>\n`; break;
        default: xml_out += `${indent}<activationPhases>NONE</activationPhases>\n`; break;
    }
    indent = indent.slice(0, indent.length-1);

    switch (prop.position) {
        case DIRECTIONS.UP: xml_out += `${indent}</up>\n`; break;
        case DIRECTIONS.DOWN: xml_out += `${indent}</down>\n`; break;
        case DIRECTIONS.LEFT: xml_out += `${indent}</left>\n`; break;
        case DIRECTIONS.RIGHT: xml_out += `${indent}</right>\n`; break;
        default: break;
    }
    return xml_out;
}

const xml_to_map = (xml_string) => {
    let xml = new DOMParser().parseFromString(xml_string, "text/xml");
    const rows = xml.getElementsByTagName("row");
    let map = {
        tiles: [...rows].map((row_xml) => {
            const row = row_xml.getElementsByTagName("tile");
            return [...row].map((tile) => {
                return xml_tile_to_tile_obj(tile);
            })
        })
    }
    return map;
}

const map_to_xml = (map) => {
    let indent = ``;
    let xml_out = `<gameboard>\n`;
    indent += `\t`;
    for (let row = 0; row < map.tiles.length; row++) {
        xml_out += `${indent}<row>\n`;
        indent += `\t`
        for (let col = 0; col < map.tiles[row].length; col++) {;
            let tile = map.tiles[row][col];
            xml_out += `${indent}<tile>\n`;
            indent += `\t`;
            xml_out += `${indent}<tileType>${TILE_TYPE_STRING[tile.tile_type]}</tileType>\n`;
            if (tile.variant !== undefined) {
                xml_out += `${indent}<variant>${tile.variant}</variant>\n`;
            }
            if (tile.direction !== undefined) {
                xml_out += `${indent}<direction>${directionToString(tile.direction)}</direction>\n`;
            }
            if (tile.sourceDirection !== undefined) {
                xml_out += `${indent}<sourceDirection>${directionToString(tile.sourceDirection)}</sourceDirection>\n`;
            }
            if (tile.props && Object.entries(tile.props).length > 0) {
                xml_out += `${indent}<props>\n`
                for (let prop in tile.props) {
                    xml_out += prop_to_xml(tile.props[prop], indent);
                }
                xml_out += `${indent}</props>\n`
            }
            indent = indent.slice(0, indent.length-1);
            xml_out += `${indent}</tile>\n`;
        }
        indent = indent.slice(0, indent.length-1);
        xml_out += `${indent}</row>\n`;
    }
    xml_out += `</gameboard>`
    return xml_out;
}

export {create_new_map, TILE_TYPES, tileTypeToImageKey, ALL_TILES, enumerate_map, is_position_in_map, selectionToImageKey, TYPES, ALL_PROPS, propTypeToImageKey, map_to_xml, xml_to_map}