import { createSlice } from '@reduxjs/toolkit'

// const INITIAL_STATE = { cart: [] }
// if (localStorage.getItem('cart'))
//   INITIAL_STATE = JSON.parse(localStorage.getItem('cart'))

const INITIAL_STATE = localStorage.getItem('cart')
  ? { cart: JSON.parse(localStorage.getItem('cart'))}
  : { cart: [] }

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    setCart(state, action) {
      // Update the state with the action payload
      state.cart = action.payload
    },
  },
})

// Destructure the actions off setCart
export const { setCart } = cartSlice.actions

// Get the reducer off the created slice
export const cartReducer = cartSlice.reducer
