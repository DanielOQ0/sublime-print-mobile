import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./ReloadTabs/reducer"
const store = configureStore({
    reducer: {
        tabsReducer: tabsReducer
    }
})

export default store