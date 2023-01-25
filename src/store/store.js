import { configureStore } from "@reduxjs/toolkit";
import mapReducer from './mapSlice';
import imageReducer from './imageSlice';
import undoable from 'redux-undo';

export const store = configureStore({
    reducer: {
        map: undoable(mapReducer, {
            limit: 6
        }),
        images: imageReducer
    },
})