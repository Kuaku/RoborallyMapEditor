import {tile_to_xml, xml_tile_to_tile_obj, TILE_TYPES} from "./tiles";
import {ExportXMLParser} from "./export_xml_parser";

const STANDARD_SIZE = {width: 10, height: 10};

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

const create_new_map = () => {
    const tiles = [];
    for (let i = 0; i < STANDARD_SIZE.height; i++) {
        tiles.push([]);
        for (let j = 0; j < STANDARD_SIZE.width; j++) {
            tiles[i].push({ tile_type: TILE_TYPES.OpenFloor });
        }
    }

    return {
        tiles,
    }
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
    let parser = new ExportXMLParser();
    parser.open_tag("gameboard");
    for (let row = 0; row < map.tiles.length; row++) {
        parser.open_tag("row");
        for (let col = 0; col < map.tiles[row].length; col++) {;
            let tile = map.tiles[row][col];
            tile_to_xml(tile, parser);
        }
        parser.close_tag();
    }
    parser.close_tag();
    return parser.get_text();
}

export {create_new_map, enumerate_map, is_position_in_map, map_to_xml, xml_to_map}