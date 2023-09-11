import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  user: null,
}

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      // Update the state with the action payload
      state.user = action.payload
    },
    logoutUser(state, action) {
      // Update the state with the action payload
      state.user = null
    },
  },
})

// Destructure the actions off setUser
export const { setUser, logoutUser } = userSlice.actions

// Get the reducer off the created slice
export const userReducer = userSlice.reducer
