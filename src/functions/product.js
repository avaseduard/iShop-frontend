import axios from 'axios'

// Create new product
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all products by count
export const getProductsByCount = async count =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

// Remove a product
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// List product by slug
export const getProductBySlug = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

// Update product
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all products by sort criteria
export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort: sort,
    order: order,
    page: page,
  })

// Get the number of products in db
export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`)

// Rate product
export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// List related products
export const getRelated = async productId =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)

  // List searched products
export const fetchProductsbyFilter = async (argument) =>
await axios.post(`${process.env.REACT_APP_API}/search/filters`, argument)
