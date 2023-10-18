import axios from 'axios'

// Create new color
export const createBrand = async (brand, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/brand`, brand, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all colors
export const listAllBrands = async () =>
  await axios.get(`${process.env.REACT_APP_API}/brands`)

// Remove one color
export const removeBrand = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/brand/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get one color
export const getBrand = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`)

// Update one color
export const brandUpdate = async (slug, brand, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/brand/${slug}`, brand, {
    headers: {
      authtoken: authtoken,
    },
  })