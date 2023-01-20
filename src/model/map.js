import XMLParser from 'react-xml-parser';
import axios from 'axios';
const STANDARD_SIZE = {width: 10, height: 10};

const TILE_TYPES = {
    OpenFloor: 0,
    Gear: 1,
    NormalStraightConveyorBelt: 2,
    ExpressStraightConveyorBelt: 3,
    NormalTurnConveyorBelt: 4,
    ExpressTurnConveyorBelt: 5,
    Pit: 6,
    Flag: 7,
}

const getImageKeys = [
    //OpenFloor
    (_tile) => {
        return "OPEN_FLOOR"
    },
    //Gear
    (tile) => {
        return "";
    },
    //NormalStraightConveyorBelt
    (tile) => {
        switch (tile.direction) {
            case DIRECTIONS.UP: return "CONV_BELT_NORMAL_UP_STRAIGHT"
            case DIRECTIONS.DOWN: return "CONV_BELT_NORMAL_DOWN_STRAIGHT"
            case DIRECTIONS.LEFT: return "CONV_BELT_NORMAL_LEFT_STRAIGHT"
            case DIRECTIONS.RIGHT: return "CONV_BELT_NORMAL_RIGHT_STRAIGHT"
            default: return "";
        }
    },
    //ExpressStraightConveyorBelt
    (tile) => {
        switch (tile.direction) {
            case DIRECTIONS.UP: return "CONV_BELT_EXPRESS_UP_STRAIGHT"
            case DIRECTIONS.DOWN: return "CONV_BELT_EXPRESS_DOWN_STRAIGHT"
            case DIRECTIONS.LEFT: return "CONV_BELT_EXPRESS_LEFT_STRAIGHT"
            case DIRECTIONS.RIGHT: return "CONV_BELT_EXPRESS_RIGHT_STRAIGHT"
            default: return "";
        }
    },
    //NormalTurnConveyorBelt
    (tile) => {
        return "";
    },
    //ExpressTurnConveyorBelt
    (tile) => {
        return "";
    },
    //Pit
    (_tile) => {
        return "PIT";
    },
    //Flag
    (tile) => {
        return "";
    },
]

const DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
}

const ALL_TILES = [
    {
        tile_type: TILE_TYPES.OpenFloor
    },
    {
        tile_type: TILE_TYPES.Pit
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
    }
];

const getTileSet = () => {
    return new Promise((resolve) => {
        console.log("Initialise tileset");
        axios.get("/RoborallyMapEditor/tiles.xml").then(xml_string => {
            let xml = new XMLParser().parseFromString(xml_string.data);
            let tiles = xml.getElementsByTagName("Tile");
            let tileSet = {};
            [...tiles].forEach(tile => {
                let key = tile.attributes.key;
                tileSet[key] = {
                    position: {
                        x: parseInt(tile.children[0].attributes.x),
                        y: parseInt(tile.children[0].attributes.y)
                    },
                    size: {
                        width: tile.children[1].attributes.x - tile.children[0].attributes.x,
                        height: tile.children[1].attributes.y - tile.children[0].attributes.y,
                    }
                }
            })

            console.log(tileSet);
            resolve(tileSet);
        })
    })
}

const create_new_map = () => {
    const tiles = [];
    for (let i = 0; i < STANDARD_SIZE.width; i++) {
        tiles.push([]);
        for (let j = 0; j < STANDARD_SIZE.height; j++) {
            tiles[i].push(create_new_tile());
        }
    }

    return {
        tiles,
    }
}

const tileTypeToImageKey = (tile) => {
    return getImageKeys[tile.tile_type](tile);
}

const create_new_tile = () => {
    return {
        tile_type: TILE_TYPES.OpenFloor
    }
}


export {create_new_map, TILE_TYPES, getTileSet, tileTypeToImageKey, ALL_TILES}