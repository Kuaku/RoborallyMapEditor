import {useEffect, useRef, useState} from "react";
import {getTileSet, tileTypeToImageKey} from "../../model/map";

function MapRenderer ({map, width, height}) {


    const canvasRef = useRef(null);
    const [tileSet, setTileSet] = useState(undefined);
    const [image, setImage] = useState(undefined);

    const render = () => {
        console.log("RENDER", image, map);
        if (canvasRef.current == null)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const cellSize = {width: width/map.tiles.length, height: height/map.tiles[0].length};

        ctx.strokeStyle = "#000000";

        map.tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                const tilePosition = {x: (i+1) * cellSize.width, y: (j+1) * cellSize.height}
                drawTile(ctx, tile, tilePosition, cellSize);

                strokeRect(ctx, tilePosition, cellSize);
            })
        })
    }


    const drawTile = (ctx, tile, tilePosition, cellSize) => {
        let image_key = tileTypeToImageKey(tile);
        console.log(tileSet, image_key)
        drawImage(ctx, image, tileSet[image_key].position, tileSet[image_key].size, tilePosition, cellSize);
    }

    const strokeRect = (ctx, position, size) => {
        ctx.strokeRect(position.x, position.y, size.width, size.height);
    }

    const drawImage = (ctx, image, sourcePosition, sourceSize, destPosition, destSize) => {
        console.log(image, sourcePosition.x, sourcePosition.y, sourceSize.width, sourceSize.height, destPosition.x, destPosition.y, destSize.width, destSize.height);
        ctx.drawImage(image, sourcePosition.x, sourcePosition.y, sourceSize.width, sourceSize.height, destPosition.x, destPosition.y, destSize.width, destSize.height);
    }


    useEffect(() => {
        render();
        }, [image, render])


    useEffect(() => {
        render();
        }, [tileSet, render])

    const loadTileSet = async () => {
        const tileSet = await getTileSet();
        setTileSet(tileSet);
    }

    const loadImage = async () => {
        let image = new Image();
        console.log("IMAGE:", image);
        image.onload = () => {
            console.log("IMAGE:", image);
            setImage(image);
        };
        image.src = "/RoborallyMapEditor/tiles_tileset.png";
    }

    useEffect(() => {
        loadTileSet();
        loadImage();
        }, [])

    if (!tileSet || !image)
        return (<></>);

    return (<>
    <canvas ref={canvasRef} width={width} height={height}></canvas>
    </>)
}

export default MapRenderer;