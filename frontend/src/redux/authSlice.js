import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        // for seeing profile after successfull login initally set null to the user
        user:null
    },
    reducers:{
        //create of action
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        // for seeing profile after successfull login set state and action
        setAuthUser:(state,action)=>{
            state.user= action.payload
        }
    }
});
export const {setLoading,setAuthUser} = authSlice.actions;
export default authSlice.reducer;