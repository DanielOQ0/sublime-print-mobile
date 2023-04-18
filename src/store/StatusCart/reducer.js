import { createReducer } from "@reduxjs/toolkit";
import statusActions from './actions'

const {captureStatus} =statusActions
const inicialState = {
    Status: false,
}
const reducer = createReducer(
    inicialState, 
    (builder) => builder
    .addCase(
        captureStatus,
        (state, action) => {
            let newState = {
                ...state,
                Status: action.payload.Status
            }
            return newState
        }
    )
)
export default reducer;
