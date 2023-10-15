import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { updateArray } from '../../functions/general/helpers';

import { Statement, StatementSchema } from "delib-npm";




// Define a type for the slice state
interface AccessibiliyState {
    fontSize: number;
}


// Define the initial state using that type
const initialState: AccessibiliyState = {
    fontSize: 14,
}

export const accessibilitySlicer = createSlice({
    name: 'accessibility',
    initialState,
    reducers: {
        increaseFontSize: (state, action: PayloadAction<number>) => {
            try {

                state.fontSize += action.payload;

            } catch (error) {
                console.error(error);
            }
        },

    },
})

export const { increaseFontSize } = accessibilitySlicer.actions

export const fontSizeSelector = (state: RootState) => state.accessibiliy.fontSize;


export default accessibilitySlicer.reducer