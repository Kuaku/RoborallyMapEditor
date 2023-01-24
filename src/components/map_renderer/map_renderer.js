import {useCallback, useEffect, useRef, useState} from "react";
import {enumerate_map, is_position_in_map} from "../../model/map";
import { useSelector, useDispatch } from 'react-redux';
import {generate_image_tags} from "../../model/images";
import {setTile, setProp} from "../../store/mapSlice";
import {tile_to_image_key} from "../../model/tiles";
import {prop_to_image_key} from "../../model/props";
import {TYPES} from "../../model/selection";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import "./map_renderer.css";

function MapRenderer () {

    const image_src = useSelector((state) => state.images.value);
    const map = useSelector((state) => state.map.value);
    const dispatch = useDispatch();

    const pref_cell_size = 64;
    const max_canvas_size = 10000;

    const canvasRef = useRef(null);
    const transformComponentRef = useRef(null);
    const [images, setImages] = useState(undefined);
    const [cellSize, setCellSize] = useState(pref_cell_size);

    const render_tiles = useCallback((ctx) => {
        ctx.save();
        enumerate_map(map, (tile, col, row) => {
            const tilePosition = {x: (col+1) * cellSize, y: (row+1) * cellSize};
            ctx.drawImage(images[tile_to_image_key({tile_type: 0})], tilePosition.x, tilePosition.y, cellSize, cellSize);
            ctx.drawImage(images[tile_to_image_key(tile)], tilePosition.x, tilePosition.y, cellSize, cellSize);
            if (tile.props) {
                Object.entries(tile.props).forEach(([key, prop]) => {
                    ctx.drawImage(images[prop_to_image_key(prop)], tilePosition.x, tilePosition.y, cellSize, cellSize);
                })
            }
        })
        ctx.restore();
    }, [map, images, cellSize])

    const render_map_inidicators = useCallback((ctx) => {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = `${cellSize/2.5}px Arial`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (let i = 0; i < map.tiles.length; i++) {
            ctx.fillText(`${i+1}`, cellSize/2, (i+1) * cellSize + cellSize/2);
        }
        for (let j = 0; j < map.tiles[0].length; j++) {
            let c = 'A'.charCodeAt(0)+j;
            if (j >= 26) {
                c = 'a'.charCodeAt(0)+(j-26)
            }
            ctx.fillText(String.fromCharCode(c), (j+1) * cellSize + cellSize/2, cellSize/2);
        }
        ctx.restore();
    }, [map, cellSize])

    const render = useCallback(() => {
        if (canvasRef.current == null || images == null)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, cellSize * (map.tiles[0].length+1), cellSize * (map.tiles.length+1));
        render_tiles(ctx);
        render_map_inidicators(ctx);
    }, [map, images, cellSize, render_tiles, render_map_inidicators]);

    useEffect(() => {
        let pref_height = pref_cell_size * map.tiles.length;
        let pref_width = pref_cell_size * map.tiles[0].length;
        if (pref_height > max_canvas_size || pref_width > max_canvas_size) {
            if (pref_height > pref_width) {
                setCellSize(max_canvas_size/map.tiles.length);
            } else {
                setCellSize(max_canvas_size/map.tiles[0].length);
            }
        } else {
            setCellSize(pref_cell_size);
        }
    }, [map])

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
        const zoom_state = transformComponentRef.current.state;
        const tilePosition = {col: Math.floor((mousePosition.x-(cellSize)*zoom_state.scale)/(cellSize*zoom_state.scale)), row: Math.floor((mousePosition.y-(cellSize)*zoom_state.scale)/(cellSize*zoom_state.scale))};
        switch (selection_object.type) {
            case TYPES.TILE: drop_tile(selection_object.object, tilePosition); break;
            case TYPES.PROP: drop_prop(selection_object.object, tilePosition); break;
            default: break;
        }
    }

    if (!images)
        return (<></>);

    return (<div className={"map-renderer"}>
        <TransformWrapper minScale={0.1} ref={transformComponentRef}>
            <TransformComponent>
                <canvas onDragOver={allowDrop} onDrop={drop} ref={canvasRef} width={cellSize * (map.tiles[0].length+1)} height={cellSize * (map.tiles.length+1)}></canvas>
            </TransformComponent>
        </TransformWrapper>
    </div>)
}

export default MapRenderer;