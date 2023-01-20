import {useCallback, useEffect, useState} from "react";
import {ALL_TILES, getTileSet, tileTypeToImageKey} from "../../model/map";
import "./tile_selection.css";

function TileSelection() {

    const [tileSet, setTileSet] = useState(undefined);
    const [image, setImage] = useState(undefined);
    const [allTiles, setAllTiles] = useState(undefined);

    const generateAllTiles = useCallback(() => {
        if (!image || !tileSet)
            return;
        const allTiles = ALL_TILES.map(tile => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext('2d');
            const imageRef = tileSet[tileTypeToImageKey(tile)];
            canvas.width = imageRef.size.width;
            canvas.height = imageRef.size.height;
            ctx.drawImage(image, imageRef.position.x, imageRef.position.y, imageRef.size.width, imageRef.size.height, 0, 0, imageRef.size.width, imageRef.size.height);
            return {src: canvas.toDataURL(), tile};
        })
        setAllTiles(allTiles);
    }, [image, tileSet]);

    useEffect(() => {
        generateAllTiles();
        }, [image, generateAllTiles])


    useEffect(() => {
        generateAllTiles();
        }, [tileSet, generateAllTiles])

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

    const dragTile = (ev, tile) => {
        console.log(JSON.stringify(tile))
        ev.dataTransfer.setData("text", JSON.stringify(tile));
        console.log(ev.dataTransfer.getData("text"))
    }

    useEffect(() => {
        loadTileSet();
        loadImage();
        }, [])

    if (!tileSet || !image || !allTiles)
        return (<></>);

    console.log(allTiles);

    return (<div className={"tile-selection"}>
    {
        allTiles.map((tileData, i) => {return (<>
        <img key={`tile-selection-${i}`} alt={`tile ${JSON.stringify(tileData.tile)} could not be loaded`} onDragStart={ev => {dragTile(ev, tileData.tile)}} draggable={true} src={tileData.src}></img>
        </>)})
    }
    </div>);
}

export default TileSelection;