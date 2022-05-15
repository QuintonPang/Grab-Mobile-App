import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
    name:"location",
    initialState: {
        origin:{
            latitude:3.1,
            longitude:2.2,
            address:"hk",
            name:"hk",
        },
        destination:{
            latitude:3.3,
            longitude:3.5,
            address:"my",
            name:"my"
        },
        isHailed: false,
    },
    reducers:{
        addOrigin:(state,action)=>{
            state.origin.latitude = action.payload.originLatitude
            state.origin.longitude = action.payload.originLongitude
            state.origin.address = action.payload.originAddress
            state.origin.name = action.payload.originName
        },
        addDestination:(state,action)=>{
            state.destination.latitude = action.payload.destinationLatitude
            state.destination.longitude = action.payload.destinationLongitude
            state.destination.address = action.payload.destinationAddress
            state.destination.name = action.payload.destinationName
        },
        setIsHailed:(state,action)=>{
            state.isHailed = action.payload.isHailed
        },
        reset:(state)=>{
            state.origin.latitude=null
            state.origin.longitude=null
            state.origin.address=""
            state.origin.name=""
            state.destination.latitude=null
            state.destination.longitude=null
            state.destination.address=""
            state.destination.name=""
            state.isHailed=false
        }
    }
})

export const { addOrigin, addDestination, setIsHailed, reset } = locationSlice.actions;
export default locationSlice.reducer;