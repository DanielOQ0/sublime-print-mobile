import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const read_products = createAsyncThunk(
  'read_products',
   async ({page, inputText, categories, order, token}) => {
  try {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    const response = await axios.get("https://subime-print-fgbog.ondigitalocean.app/api/products/?page="+page+"&title="+"&category=", headers);
    return {
      products: response.data.products,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});
// const remove_product = createAsyncThunk(
//   'remove_product',
//   async ({_Id, token}) => {
//     try {
//       let headers = { headers: { 'Authorization': `Bearer ${token}` } }
//       const response = await axios.delete(`https://subime-print-fgbog.ondigitalocean.app/api/cart/delete-one${_Id}`, headers);
//       return { _Id };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// );

// // Acción para comprar los productos en el carrito
// const buy_product = createAsyncThunk(
//   'buy_product',
//   async ({order, token, productIds}) => {
//     try {
//       let headers = { headers: { 'Authorization': `Bearer ${token}` } }
//       const response = await axios.post(`https://subime-print-fgbog.ondigitalocean.app/api/orders`, headers);
//       return { order: response.data.order };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// );




const actions = { read_products };

export default actions;