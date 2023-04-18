import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let captureCart =createAsyncThunk("captureCart",
async()=>{
    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    let url = 'http://localhost:8080/api/cart'
    try {
        if(token){
            let res = await axios.get(url, headers);
            return { cart: res.data.cart }
        }else{return {cart:[]}}
        
    } catch (error) {
        return {cart:[]}
    }
    
})
const actions = { captureCart }

export default actions 