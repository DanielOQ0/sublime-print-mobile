import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const read_products = createAsyncThunk(
  'read_products',
   async ({page, inputText, categories, order, headers}) => {
  try {
    const response = await axios.get("https://subime-print-fgbog.ondigitalocean.app/api/products/?page="+page+"&title="+inputText.trim()+"&category="+categories+"&order="+order, headers);
    return {
      products: response.data.products,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const remove_product = createAsyncThunk('remove_product', async ({ productId, token }) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await axios.delete(`https://subime-print-fgbog.ondigitalocean.app/api/products/${productId}`, {headers});
    return {
      productId,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const buy_product = createAsyncThunk('buy_product', async ({ productId, token }) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await axios.post('https://subime-print-fgbog.ondigitalocean.app/api/orders', { productId }, { headers });
    return {
      order: response.data.order,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const actions = { read_products, remove_product, buy_product };

export default actions;

