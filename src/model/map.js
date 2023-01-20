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
    switch (tile.tile_type) {
        case TILE_TYPES.OpenFloor: return "OPEN_FLOOR";
        case TILE_TYPES.Pit: return "PIT";
        default: return "";
    }
}

const create_new_tile = () => {
    return {
        tile_type: TILE_TYPES.OpenFloor
    }
}


export {create_new_map, TILE_TYPES, getTileSet, tileTypeToImageKey}