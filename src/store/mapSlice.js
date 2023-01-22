import { createSlice } from "@reduxjs/toolkit";
import {change_height, change_width} from "../model/map";

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