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
            state.value.tiles[payload.position.x][payload.position.y] = payload.tile;
        }
    }
})

export const { setMap, setTile } = mapSlice.actions

export default mapSlice.reducer