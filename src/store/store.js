import { configureStore } from "@reduxjs/toolkit";
import mapReducer from './mapSlice';
import imageReducer from './imageSlice';

export const store = configureStore({
    reducer: {
        map: mapReducer,
        images: imageReducer
    },
})