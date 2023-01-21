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
    Dock: 8,
    RepairSite: 9,
}

const PROP_TYPES = {
    Wall: 0,
    LaserBeam: 1,
}

const directionToString = (direction) => {
    switch (direction) {
        case DIRECTIONS.UP: return  "UP";
        case DIRECTIONS.DOWN: return  "DOWN";
        case DIRECTIONS.LEFT: return  "LEFT";
        case DIRECTIONS.RIGHT: return "RIGHT";
        default: return "";
    }
}

const is_position_in_map = (map, position) => {
    return position.x >= 0 && position.x < map.tiles.length && position.y >= 0 && position.y < map.tiles[0].length;
}

const enumerate_map = (map, cb) => {
    map.tiles.forEach((row, i) => {
        row.forEach((tile, j) => {
            cb(tile, i, j);
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


export {create_new_map, TILE_TYPES, tileTypeToImageKey, ALL_TILES, enumerate_map, is_position_in_map, selectionToImageKey, TYPES, ALL_PROPS, propTypeToImageKey}