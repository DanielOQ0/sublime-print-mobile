import { createReducer } from "@reduxjs/toolkit";
import productsActions from './actions'

const {read_products} = productsActions

const initialState ={
    products: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        read_products.fulfilled,
        (state,actions)=>{
            let newState = {
                ...state,
                products: actions.payload.products
            }
            return newState
        }
    )
)

export default reducer