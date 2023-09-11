import axios from 'axios'

// Get all subcategories; First argument endpoint url, second argument is object data if we send in the body, third argument is object data we send in the headers
export const getSubcategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`)

// Get one Subcategory
export const getSubcategory = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`)

// Delete Subcategory
export const removeSubcategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Update Subcategory name
export const updateSubcategory = async (slug, subcategory, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, subcategory, {
    headers: {
      authtoken: authtoken,
    },
  })

// Create new Subcategory
export const createSubcategory = async (subcategory, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/subcategory`, subcategory, {
    headers: {
      authtoken: authtoken,
    },
  })
