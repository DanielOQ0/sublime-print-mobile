import { createReducer } from "@reduxjs/toolkit"
import actions from './actions'

const { captureUser } = actions
const initialstate = {
    user:[]
}

const userReducer = createReducer(initialstate,
    (builder)=>builder
    .addCase(
        captureUser.fulfilled,
        (state,action)=>{
            let newState={
                ...state,
                user:action.payload.user
            }
            return newState
        }
    )
)
export default userReducer  