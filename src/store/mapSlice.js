import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const { setMap, setTile, setProp } = mapSlice.actions

export default mapSlice.reducer