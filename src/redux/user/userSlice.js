import {createSlice, current} from "@reduxjs/toolkit";
import {login} from "../../services/userService";

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action)=>{
            state.currentUser = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        })
    }
})
export default userSlice.reducer