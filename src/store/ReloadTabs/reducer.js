import { createReducer } from "@reduxjs/toolkit";
import tabsActions from './actions'

const { reloadTabs } = tabsActions

const initialState = {
    state: false,
}

const tabsReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            reloadTabs,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default tabsReducer