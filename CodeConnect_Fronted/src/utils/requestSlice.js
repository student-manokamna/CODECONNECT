import { createSlice } from "@reduxjs/toolkit";

const requestslice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
          return action.payload
        },
        removeRequests:(state,action)=>{
          return state.filter((request)=>request._id!==action.payload)
        }
    }
})

export const {addRequests,removeRequests}=requestslice.actions
export default requestslice.reducer