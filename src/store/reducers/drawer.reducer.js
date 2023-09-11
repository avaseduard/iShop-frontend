import { createSlice } from '@reduxjs/toolkit'

// const INITIAL_STATE = { cart: [] }
// if (localStorage.getItem('cart'))
//   INITIAL_STATE = JSON.parse(localStorage.getItem('cart'))

const INITIAL_STATE = {
  drawer: false,
}

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: INITIAL_STATE,
  reducers: {
    setDrawerVisibility(state, action) {
      // Update the state with the action payload
      state.drawer = action.payload
    },
  },
})

// Destructure the actions off setCart
export const { setDrawerVisibility } = drawerSlice.actions

// Get the reducer off the created slice
export const drawerReducer = drawerSlice.reducer
