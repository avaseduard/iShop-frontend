import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = { coupon: false }

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const couponSlice = createSlice({
  name: 'coupon',
  initialState: INITIAL_STATE,
  reducers: {
    setCouponRedux(state, action) {
      // Update the state with the action payload
      state.coupon = action.payload
    },
  },
})

// Destructure the actions off setCart
export const { setCouponRedux } = couponSlice.actions

// Get the reducer off the created slice
export const couponReducer = couponSlice.reducer
