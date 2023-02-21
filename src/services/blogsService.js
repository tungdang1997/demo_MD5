import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "./api";

export const getBlogs = createAsyncThunk(
    'blogs/getBlogs',
    async ()=>{
        const res = await customAxios.get('blogs');
        return res.data
    }
);
export const addBlog = createAsyncThunk(
    'blogs/addBlogs',
    async (data)=>{
        const res = await customAxios.post('blogs', data);
        return res.data
    }
);
export const removeBlog = createAsyncThunk(
    'blogs/removeBlogs',
    async (data)=>{
        const res = await customAxios.delete('/blogs/'+ data);
        return data
    }
)

export const findByIdBlog = createAsyncThunk(
    'blogs/findByIdBlog',
    async (data)=>{
        const res = await customAxios.get('/blogs/findById/'+data.id);
        return res.data;
    }
)

export const editBlog = createAsyncThunk(
    'blogs/editBlogs',
    async (data)=>{
        await customAxios.put('/blogs/' + data.id, data);
        const res = await customAxios.get('blogs');
        return res.data
    }
)