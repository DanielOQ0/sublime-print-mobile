import { createSlice } from '@reduxjs/toolkit';


const cartReducer = createSlice({
    name: 'cart',
    initialState: {
      items: [],
    },
    reducers: {
      // Reducer para agregar un producto al carrito
      addToCart: (state, action) => {
        const product = action.payload;
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
      },
      // Reducer para eliminar un producto del carrito
      removeFromCart: (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter((item) => item.id !== productId);
      },
      // Reducer para actualizar la cantidad de un producto en el carrito
      updateCartItemQuantity: (state, action) => {
        const { productId, quantity } = action.payload;
        const existingItem = state.items.find((item) => item.id === productId);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      },
      // Reducer para vaciar el carrito
      clearCart: (state) => {
        state.items = [];
      },
    },
  });
  
  export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartReducer.actions;
  
  export default cartReducer.reducer;