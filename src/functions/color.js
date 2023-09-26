import axios from 'axios'

// Create new color
export const createColor = async (color, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/color`, color, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all colors
export const listAllColors = async () =>
  await axios.get(`${process.env.REACT_APP_API}/colors`)

// Remove one color
export const removeColor = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/color/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get one color
export const getColor = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/color/${slug}`)

// Update one color
export const colorUpdate = async (slug, color, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/color/${slug}`, color, {
    headers: {
      authtoken: authtoken,
    },
  })