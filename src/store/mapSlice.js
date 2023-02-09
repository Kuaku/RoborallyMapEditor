import { createSlice } from "@reduxjs/toolkit";
import {add_portal_to_map, change_height, change_width} from "../model/map";
import {TILE_TYPES} from "../model/tiles";

const initialState = {
    value: undefined,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMap: (state, action) => {
            state.value = action.payload;
        },
        setTile: (state, action) => {
            const payload = action.payload;
            if (payload.tile.tile_type === TILE_TYPES.Portal) {
                state.value = add_portal_to_map(payload.position, payload.tile, state.value);
                return;
            }
            state.value.tiles[payload.position.row][payload.position.col] = payload.tile;
        },
        setProp: (state, action) => {
            const payload = action.payload;
            if (!state.value.tiles[payload.position.row][payload.position.col].props) {
                state.value.tiles[payload.position.row][payload.position.col].props = {};
            }
            state.value.tiles[payload.position.row][payload.position.col].props[payload.prop.position] = payload.prop;
        },
        changeHeight: (state, action) => {
            const payload = action.payload;
            state.value = change_height(state.value, parseInt(payload.height));
        },
        changeWidth: (state, action) => {
            const payload = action.payload;
            state.value = change_width(state.value, parseInt(payload.width));
        }
    }
})

export const { setMap, setTile, setProp, changeHeight, changeWidth } = mapSlice.actions

export default mapSlice.reducer