import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./ReloadTabs/reducer"
import userReducer from "./CaptureUser/reducer"
import textReducer from './Search/reducer'
import categoriesReducer from './Categories/reducer'
import productsReducer from "./Products/reducer"
import detailsReducer from "./Details/reducer"

const store = configureStore({
    reducer: {
        tabsReducer: tabsReducer,
        userReducer: userReducer,
        text: textReducer,
        categories: categoriesReducer, 
        products: productsReducer,
        details: detailsReducer,
    }
})

export default store