import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user.reducer'
import { searchReducer } from './reducers/search.reducer'
import { cartReducer } from './reducers/cart.reducer'
import { drawerReducer } from './reducers/drawer.reducer'
import { couponReducer } from './reducers/coupon.reducer'
import { cashOnDeliveryReducer } from './reducers/cod.reducer'

// Use the combineReducers method to combine all reducers into a general one; they keys are the name of the reducer slice and the value is the actual reducer function
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  cashOnDelivery: cashOnDeliveryReducer,
})
