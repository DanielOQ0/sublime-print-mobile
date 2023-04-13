import { createReducer } from "@reduxjs/toolkit";
import productsClickActions from './actions'

const { productsPagination } = productsClickActions

const initialState = {
    state: false,
}

const productsClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            productsPagination,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default productsClickReducer