import axios from 'axios'

// Get all categories; First argument endpoint url, second argument is object data if we send in the body, third argument is object data we send in the headers
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`)

// Get one category
export const getCategory = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

// Delete category
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Update category name
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken: authtoken,
    },
  })

// Create new category
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get subcategories based on category id
export const getSubcategoriesByCategoryId = async _id =>
  await axios.get(`${process.env.REACT_APP_API}/category/subcategory/${_id}`)
