import { createReducer } from "@reduxjs/toolkit"
import actions from './actions'

const { captureCart } = actions
const initialstate = {
    cart:[]
}

const reducer = createReducer(initialstate,
    (builder)=>builder
    .addCase(
        captureCart.fulfilled,
        (state,action)=>{
            let newState={
                ...state,
                cart:action.payload.cart
            }
            return newState
        }
    )
)
export default reducer 