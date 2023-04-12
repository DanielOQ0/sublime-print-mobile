import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Defina una acción asincrónica para leer productos con el token
const read_products = createAsyncThunk('read_products', async ({ token }) => {
  try {
    
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await axios.get('https://subime-print-fgbog.ondigitalocean.app/api/products?page=1&quantity=100', { headers });
    return {
      products: response.data.products,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const actions = { read_products };

export default actions;
