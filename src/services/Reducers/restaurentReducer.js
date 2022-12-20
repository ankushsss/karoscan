import { createReducer,createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import headers from "../../_mock/header"
import { restaurantList } from "./Api/api"
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

// export const categoryList = createAsyncThunk('Add_Restaurent',async (id)=>{
//   try{
//   const res = await axios.post(process.env.React_App_CUSTOMER_REGISTRATION_API,{id_token:id},{headers})
//   console.log(res,"reducer")
//   return res
//   }
//   catch(err){
//     return err
//   }
// })



const restaurantReducer = createSlice({
  name:"restaurant",
  initialState,
  reducer:{
    addCategory(state,action){
        state = action.data
    }
  },
  extraReducers:{
    [restaurantList.fulfilled] : (state, action) =>{
      console.log(action.payload.data)
      state.mssg = "success"
      state.payload = action.payload
    },
    [restaurantList.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [restaurantList.rejected] : (state, action) =>{
      state.mssg = "rejected"
      
    }
  }
})

export const {addCategory} = restaurantReducer.actions

export default restaurantReducer.reducer