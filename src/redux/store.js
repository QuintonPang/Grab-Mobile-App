import { configureStore } from "@reduxjs/toolkit"
import locationReducer from './locationSlice' 
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        location: locationReducer,
        user: userReducer,
    }
})