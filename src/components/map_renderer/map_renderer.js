import {useCallback, useEffect, useRef, useState} from "react";
import {getTileSet, tileTypeToImageKey} from "../../model/map";

function MapRenderer ({map, width, height, changeTileRequest}) {


    const canvasRef = useRef(null);
    const [tileSet, setTileSet] = useState(undefined);
    const [image, setImage] = useState(undefined);

    const drawImage = useCallback((ctx, image, sourcePosition, sourceSize, destPosition, destSize) => {
        ctx.drawImage(image, sourcePosition.x, sourcePosition.y, sourceSize.width, sourceSize.height, destPosition.x, destPosition.y, destSize.width, destSize.height);
        }, [])
    
    const drawTile = useCallback((ctx, tile, tilePosition, cellSize) => {
        let image_key = tileTypeToImageKey(tile);
        drawImage(ctx, image, tileSet[image_key].position, tileSet[image_key].size, tilePosition, cellSize);
    }, [image, tileSet, drawImage])

    const render = useCallback(() => {
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
    }, [drawTile, height, width, map, image]);




    const strokeRect = (ctx, position, size) => {
        ctx.strokeRect(position.x, position.y, size.width, size.height);
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

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drop = (ev) => {
        ev.preventDefault();
        const cellSize = {width: width/map.tiles.length, height: height/map.tiles[0].length};
        const canvasSize = canvasRef.current.getBoundingClientRect();
        const position = {x: ev.clientX - canvasSize.left, y: ev.clientY - canvasSize.top};
        const tilePosition = {x: parseInt((position.x-cellSize.width)/cellSize.width), y: parseInt((position.y-cellSize.height)/cellSize.height)};
        const tile = JSON.parse(ev.dataTransfer.getData("text"));
        if (tilePosition.x >= 0 && tilePosition.x < map.tiles.length && tilePosition.y >= 0 && tilePosition.y < map.tiles[0].length) {
            changeTileRequest(tilePosition, tile);
        }
        //console.log(JSON.parse(ev.dataTransfer.getData("text")));
    }

    useEffect(() => {
        loadTileSet();
        loadImage();
        }, [])

    if (!tileSet || !image)
        return (<></>);

    return (<>
    <canvas onDragOver={allowDrop} onDrop={drop} ref={canvasRef} width={width} height={height}></canvas>
    </>)
}

export default MapRenderer;