import axios from "axios";
import XMLParser from "react-xml-parser";

const load_images = async () => {
    const tile_set_position = await get_tile_set();
    const image = await get_image();
    let tile_set = {};
    tile_set_position.forEach((tile_position) => {
        tile_set[tile_position.key] = generate_image(image, tile_position);
    });
    return tile_set;
}

const generate_image_tags = (image_src) => {
    let images = {};

    for (const [tile_key, src] of Object.entries(image_src)) {
        let image = new Image();
        image.src = src;
        images[tile_key] = image;
    }

    return images;
}

const generate_image = (image, position) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    canvas.width = position.size.width;
    canvas.height = position.size.height;
    ctx.drawImage(image, position.position.x, position.position.y, position.size.width, position.size.height, 0, 0, position.size.width, position.size.height);
    return canvas.toDataURL();
}

const get_image = () => {
    return new Promise((resolve) => {
        let image = new Image();
        console.log("IMAGE:", image);
        image.onload = () => {
            resolve(image);
        };
        image.src = "/RoborallyMapEditor/tiles_tileset.png";
    })
}

const get_tile_set = async () => {
    let xml = await request_tileset_xml();
    let tiles = xml.getElementsByTagName("Tile");
    return [...tiles].map(tile => {
        return parse_tile(tile);
    })
}

const parse_tile = (tile) => {
    return {
        key: tile.attributes.key,
        position: {
            x: parseInt(tile.children[0].attributes.x),
            y: parseInt(tile.children[0].attributes.y)
        },
        size: {
            width: tile.children[1].attributes.x - tile.children[0].attributes.x,
            height: tile.children[1].attributes.y - tile.children[0].attributes.y,
        }
    }
}

const request_tileset_xml = () => {
    return new Promise((resolve) => {
        axios.get("/RoborallyMapEditor/tiles.xml").then(res => {
            resolve(new XMLParser().parseFromString(res.data));
        })
    })
}

export { generate_image_tags }

export default load_images