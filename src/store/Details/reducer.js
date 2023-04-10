import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
const {captureDetails} = actions

const initialState = {
    details: false,
    product: [],
}

const reducer = createReducer(initialState, (builder) =>
    builder.addCase(captureDetails, (state, action) =>{
        let newState = {
            ...state,
            details: action.payload.details,
            product: action.payload.product
        };
        return newState
        })
    )

    export default reducer