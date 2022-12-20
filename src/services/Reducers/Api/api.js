import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import headers from "../../../_mock/header"

export const categoryList = createAsyncThunk('categoryList',async (id)=>{
    try{
        
    const res = await axios.get("http://localhost:4200/api/login",{headers})
    console.log(res,"reducerCategryList")
    return  res
    
    }
    catch(err){
      return err
    }
  })

  export const restaurantList = createAsyncThunk('restaurantList',async (data)=>{
    try{
        
    const res = await axios.get(`${process.env.React_App_GET_ALL_RESTURANT_API}${data.payload.data.customer_id}`,{headers})
    console.log(res,"restaurantList")
    return  res
    
    }
    catch(err){
      return err
    }
  })

  export const customerRegistration = createAsyncThunk('Add_Restaurent',async (id)=>{
    try{
    const res = await axios.post(process.env.React_App_CUSTOMER_REGISTRATION_API,{id_token:id},{headers})
    console.log(res,"reducer")
    return res
    }
    catch(err){
      return err
    }
  })






  // async functions

  export async function addMenuCategory(id,cid,catId,data){
    try{
        console.log(catId,data,"dataaaaaaaaaaaaaaaaaaaaaaaa")
    const res = await axios.post("https://karo-scan-dev-api.azure-api.net/karoscan-menu-items/add-menu-items",{
      customerId:cid,
      restaurantId:id,
      categoryId:catId,
      item:[data]
    },{headers})
    console.log(res,"addCategory")
    return  "success"
    
    }
    catch(err){
      return err
    }
  }

  export async function addCategory(id,cid,data){
    try{
        
    const res = await axios.post("https://karo-scan-dev-api.azure-api.net/karoscan-menu/addCategory",{
      customerId:cid,
      restaurantId:id,
      categoryList:[data]
    },{headers})
    console.log(res,"addCategory")
    return  "success"
    
    }
    catch(err){
      return err
    }
  }