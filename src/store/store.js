import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./ReloadTabs/reducer"
import userReducer from "./CaptureUser/reducer"
import textReducer from './Search/reducer'
import categoriesReducer from './Categories/reducer'
import productsReducer from "./Products/reducer"
import detailsReducer from "./Details/reducer"
import cartReducer from "./Cart/cartReducer"
import productsClickReducer from './ProductsPagination/reducer'
import sortReducer from './Sort/reducer'

const store = configureStore({

    reducer: {
        tabsReducer: tabsReducer,
        userReducer: userReducer,
        text: textReducer,
        categories: categoriesReducer, 
        products: productsReducer,
        details: detailsReducer,
        cart: cartReducer,
        productsPagination: productsClickReducer,
        order: sortReducer
    }, 

})

export default store
