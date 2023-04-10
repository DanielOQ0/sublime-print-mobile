import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_products = createAsyncThunk(
    "read_products",
    async ({ page, inputText, categories, order, headers }) => {
        try{
            let response = await axios.get("https://subime-print-fgbog.ondigitalocean.app/api/products/?page="+page+"&title="+inputText.trim()+"&category="+categories+"&order="+order,headers)
            console.log(response)
            return { products: response.data.products}
            
        }catch(error){
            return { products: '' }
        }
    }
)

const actions = { read_products}

export default actions