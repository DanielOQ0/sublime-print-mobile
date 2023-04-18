import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { checkoutMP } = actions

const initialState= {
    checkout: ""
}
const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        checkoutMP,
        (state,action) =>{
            let newState ={
                ...state,
                checkout : action.payload.checkout
            }
            return newState
        }
    )
)

export default reducer