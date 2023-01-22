import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: undefined,
}

export const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImages: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setImages } = imageSlice.actions

export default imageSlice.reducer