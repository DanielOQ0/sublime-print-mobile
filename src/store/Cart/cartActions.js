export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const UPDATE_PRODUCT_QUANTITY = 'UPDATE_PRODUCT_QUANTITY';

export const addProductToCart = (product, quantity) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, quantity },
});

export const removeProductFromCart = (productId) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: { productId },
});

export const updateProductQuantity = (productId, quantity) => ({
  type: UPDATE_PRODUCT_QUANTITY,
  payload: { productId, quantity },
});
