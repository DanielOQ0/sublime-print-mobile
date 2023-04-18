import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./ReloadTabs/reducer"
import userReducer from "./CaptureUser/reducer"
import textReducer from './Search/reducer'
import categoriesReducer from './Categories/reducer'
import productsReducer from "./Products/reducer"
import sortReducer from './Sort/reducer'
import statusReducer from './StatusCart/reducer'
import checkoutMP from "./CheckoutMP/reducer"
import priceReducer from './ChangePrice/reducer'

export const store = configureStore({
    reducer: {
        tabsReducer: tabsReducer,
        userReducer: userReducer,
        text: textReducer,
        price: priceReducer,
        categories: categoriesReducer, 
        products: productsReducer,
        order: sortReducer,
        Status: statusReducer,
        mercadopago: checkoutMP
    }, 

})

export default store

