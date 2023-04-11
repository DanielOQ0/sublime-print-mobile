import { createReducer } from "@reduxjs/toolkit";
import productsActions from './actions.js'

const { read_products } = productsActions
const initialState = {
    products: [],
};


const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            read_products.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    products: action.payload.products
                }
                return newState
            }
        )
)

export default reducer