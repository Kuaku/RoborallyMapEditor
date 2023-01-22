import {useCallback, useEffect, useRef, useState} from "react";
import {enumerate_map, tileTypeToImageKey, is_position_in_map, TYPES, propTypeToImageKey} from "../../model/map";
import { useSelector, useDispatch } from 'react-redux';
import {generate_image_tags} from "../../model/images";
import {setTile, setProp} from "../../store/mapSlice";

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

        enumerate_map(map, (tile, col, row) => {
            const tilePosition = {x: (col+1) * cellSize.width, y: (row+1) * cellSize.height};
            ctx.drawImage(images[tileTypeToImageKey(tile)], tilePosition.x, tilePosition.y, cellSize.width, cellSize.height);
            if (tile.props) {
                Object.entries(tile.props).forEach(([key, prop]) => {
                    ctx.drawImage(images[propTypeToImageKey(prop)], tilePosition.x, tilePosition.y, cellSize.width, cellSize.height);
                })
            }
        })
    }, [map, images, cellSize]);

    useEffect(() => {
        setCellSize({width: width/(map.tiles[0].length+1), height: height/(map.tiles.length+1)});
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

    const drop_tile = (tile, tilePosition) => {
        if (is_position_in_map(map, tilePosition)) {
            dispatch(setTile({position: tilePosition, tile}));
        }
    }

    const drop_prop = (prop, propPosition) => {
        if (is_position_in_map(map, propPosition)) {
            dispatch(setProp({position: propPosition, prop}));
        }
    }

    const drop = (ev) => {
        ev.preventDefault();
        const selection_object = JSON.parse(ev.dataTransfer.getData("text"));
        const canvasSize = canvasRef.current.getBoundingClientRect();
        const mousePosition = {x: ev.clientX - canvasSize.left, y: ev.clientY - canvasSize.top};
        const tilePosition = {col: Math.floor((mousePosition.x-cellSize.width)/cellSize.width), row: Math.floor((mousePosition.y-cellSize.height)/cellSize.height)};
        switch (selection_object.type) {
            case TYPES.TILE: drop_tile(selection_object.object, tilePosition); break;
            case TYPES.PROP: drop_prop(selection_object.object, tilePosition); break;
            default: break;
        }
    }

    if (!images)
        return (<></>);

    return (<>
    <canvas onDragOver={allowDrop} onDrop={drop} ref={canvasRef} width={width} height={height}></canvas>
    </>)
}

export default MapRenderer;