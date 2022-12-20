import { createReducer,createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import headers from "../../_mock/header"
// import { categoryList } from "./Api/api"
import { addMenuCategory } from "./Api/api"
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



const addMenuCategoryData = createSlice({
  name:"category",
  initialState,
  extraReducers:{
    [addMenuCategory.fulfilled] : (state, action) =>{
      console.log(action.payload.data)
      state.mssg = "success"
      state.payload = action.payload
    },
    [addMenuCategory.pending] : (state, action) =>{
      state.mssg = "loading"
    },
    [addMenuCategory.rejected] : (state, action) =>{
      state.mssg = "rejected"
      
    }
  }
})

// export const {addCategory} = addMenuCategory.actions

export default addMenuCategoryData.reducer


// export  default createReducer(intialState,(builder)=>{
//   builder.addCase("Add_Resturant",(state,action)=>{
//     state = action.data
//   })
// })