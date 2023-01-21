import {useCallback, useEffect, useRef, useState} from "react";
import {enumerate_map, tileTypeToImageKey, is_position_in_map} from "../../model/map";
import { useSelector, useDispatch } from 'react-redux';
import {generate_image_tags} from "../../model/images";
import {setTile} from "../../store/mapSlice";

function MapRenderer ({width, height}) {

    const image_src = useSelector((state) => state.images.value);
    const map = useSelector((state) => state.map.value);
    const dispatch = useDispatch();

    const canvasRef = useRef(null);
    const [images, setImages] = useState(undefined);
    const [cellSize, setCellSize] = useState({x: 0, y: 0});

    const render = useCallback(() => {
        if (canvasRef.current == null || images == null)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        enumerate_map(map, (tile, i, j) => {
            const tilePosition = {x: (i+1) * cellSize.width, y: (j+1) * cellSize.height};
            ctx.drawImage(images[tileTypeToImageKey(tile)], tilePosition.x, tilePosition.y, cellSize.width, cellSize.height);
        })
    }, [map, images, cellSize]);

    useEffect(() => {
        setCellSize({width: width/map.tiles.length, height: height/map.tiles[0].length});
    }, [map, width, height])

    useEffect(() => {
        render();
    }, [map, images, render])

    useEffect(() => {
        setImages(generate_image_tags(image_src));
    }, [image_src])

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drop = (ev) => {
        ev.preventDefault();
        const canvasSize = canvasRef.current.getBoundingClientRect();
        const mousePosition = {x: ev.clientX - canvasSize.left, y: ev.clientY - canvasSize.top};
        const tilePosition = {x: Math.floor((mousePosition.x-cellSize.width)/cellSize.width), y: Math.floor((mousePosition.y-cellSize.height)/cellSize.height)};
        const tile = JSON.parse(ev.dataTransfer.getData("text"));
        if (is_position_in_map(map, tilePosition)) {
            dispatch(setTile({position: tilePosition, tile}));
        }
    }

    if (!images)
        return (<></>);

    return (<>
    <canvas onDragOver={allowDrop} onDrop={drop} ref={canvasRef} width={width} height={height}></canvas>
    </>)
}

export default MapRenderer;