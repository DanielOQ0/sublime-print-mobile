import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_PRODUCT_QUANTITY } from './cartActions';

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            const { product, quantity } = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.product._id === product._id);
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].quantity += quantity;
                return { ...state, cartItems: updatedCartItems };
            } else {
                const newItem = { product, quantity };
                return { ...state, cartItems: [...state.cartItems, newItem] };
            }
        case REMOVE_PRODUCT_FROM_CART:
            const { productId } = action.payload;
            const updatedCartItems = state.cartItems.filter(item => item.product._id !== productId);
            return { ...state, cartItems: updatedCartItems };
        case UPDATE_PRODUCT_QUANTITY:
            const { productId: id, quantity: qty } = action.payload;
            const cartItems = state.cartItems.map(item => item.product._id === id ? { ...item, quantity: qty } : item);
            return { ...state, cartItems };
        default:
            return state;
    }
};

export default cartReducer;
