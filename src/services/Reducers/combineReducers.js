import { configureStore,createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import costomerReducer from "./customerReducer"
import categoryReducers from './categoryReducers'
import restaurantReducer from './restaurentReducer'
import addMenuCategoryData from './addMenuCategoryReducer'
// import { addMenuCategory } from './Api/api'
// import { restaurentRed } from './customerReducer'
// import { createStore } from 'redux'

// const allReducer = () =>{ 
//     combineReducers({
//     rest:resturantReducer
// })
// }
const reducer = {
    // User
    customer:costomerReducer,
    category:categoryReducers,
    restaurants:restaurantReducer,
    menuCategory:addMenuCategoryData

}
export  const store = configureStore({
    reducer,
    
})