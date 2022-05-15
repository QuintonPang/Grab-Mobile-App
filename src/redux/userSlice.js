import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
    initialState: {
        user:null, // realm object of user
        username: "",
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user
            state.username = action.payload.username
        },
        reset:(state)=>{
            state.user = null
            state.username=""
        }
    }
})

export const { setUser, reset } = userSlice.actions;
export default userSlice.reducer;