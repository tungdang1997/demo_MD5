import {createSlice} from "@reduxjs/toolkit";
import {addBlog, editBlog, findByIdBlog, getBlogs, removeBlog} from "../../services/blogsService";

const initialState = {
    blogs: [],
    blog: {}
}
const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBlogs.fulfilled,(state,action)=>{
            state.blogs = action.payload
        });
        builder.addCase(findByIdBlog.fulfilled,(state,action)=>{
            state.blogs = action.payload
        });
        builder.addCase(addBlog.fulfilled,(state,action)=>{
            state.blogs.push(action.payload)

        });
        builder.addCase(removeBlog.fulfilled,(state,action)=>{
            state.blogs.splice(action.payload)

        });
        builder.addCase(editBlog.fulfilled,(state,action)=>{
            state.blogs = action.payload
        });
    }

})
export default blogsSlice.reducer;