// actions.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asincrónica para obtener la lista de productos
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get('https://subime-print-fgbog.ondigitalocean.app/api/products?page=1&quantity=100');
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductsRequest = () => {
  return {
    type: 'FETCH_PRODUCTS_REQUEST',
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: products,
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: 'FETCH_PRODUCTS_FAILURE',
    payload: error,
  };
};

// Acción para agregar un producto al carrito
export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

// Acción para eliminar un producto del carrito
export const removeFromCart = (productId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
};

// Acción para actualizar la cantidad de un producto en el carrito
export const updateCartItemQuantity = (productId, quantity) => {
  return {
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: {
      productId,
      quantity,
    },
  };
};

// Acción para vaciar el carrito
export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};