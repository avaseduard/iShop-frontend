import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = { cashOnDelivery: false }

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const cashOnDeliverySlice = createSlice({
  name: 'cashOnDelivery',
  initialState: INITIAL_STATE,
  reducers: {
    setCashOnDelivery(state, action) {
      // Update the state with the action payload
      state.cashOnDelivery = action.payload
    },
  },
})

// Destructure the actions off setCart
export const { setCashOnDelivery } = cashOnDeliverySlice.actions

// Get the reducer off the created slice
export const cashOnDeliveryReducer = cashOnDeliverySlice.reducer
