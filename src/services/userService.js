import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "./api";

export const login = createAsyncThunk(
    'user/login',
    async (data)=>{
        const res = await customAxios.post('users/login', data);
        console.log(1)
        return res
    }
)