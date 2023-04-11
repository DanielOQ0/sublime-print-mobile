import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const read_products = createAsyncThunk('read_products', async ({ headers }) => {
    try {

        const response = await axios.get("https://subime-print-fgbog.ondigitalocean.app/api/products",  headers);
        return {

            products: response.data.products,
        };
    } catch (error) {
        console.log(error);
    }
});

const actions = { read_products };

export default actions;