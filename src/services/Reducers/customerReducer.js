import { createReducer,createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import headers from "../../_mock/header"
import { customerRegistration } from "./Api/api" 
// const resturantReducer = (state = intialState,action) =>{
//   switch (action.type) {
//     case "Add_Resturant":
//          state = action.data 
//         return state  
//     default:
//         return state
//         // break;
//   }
// }
const initialState = {

}





const customerReducer = createSlice({
  name:"customer",
  initialState,
  reducer:{
    addCustomer(state,action){
        state = action.data
    }
  },
  extraReducers:{
    [customerRegistration.fulfilled] : (state, action) =>{
      state.mssg = "success"
      state.payload = action.payload
      return state
    },
    [customerRegistration.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [customerRegistration.rejected] : (state,action) =>{
      state.mssg = "rejected"
    }
  }
})

export const {addCustomer} = customerReducer.actions

export default customerReducer.reducer


// export  default createReducer(intialState,(builder)=>{
//   builder.addCase("Add_Resturant",(state,action)=>{
//     state = action.data
//   })
// })




