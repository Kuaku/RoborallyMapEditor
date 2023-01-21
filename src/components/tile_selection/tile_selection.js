import {ALL_TILES, tileTypeToImageKey} from "../../model/map";
import { useSelector } from 'react-redux';
import "./tile_selection.css";

function TileSelection() {
    const images = useSelector((state) => state.images.value);

    const dragTile = (ev, tile) => {
        ev.dataTransfer.setData("text", JSON.stringify(tile));
    }

    if (!images)
        return (<></>);

    return (<div className={"tile-selection"}>
    {
        ALL_TILES.map((tile, i) => {return (
        <img key={`tile-selection-${i}`} alt={`tile ${JSON.stringify(tileTypeToImageKey(tile))} could not be loaded`} onDragStart={ev => {dragTile(ev, tile)}} draggable={true} src={images[tileTypeToImageKey(tile)]}></img>
        )
        })
    }
    </div>);
}

export default TileSelection;