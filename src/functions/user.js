import axios from 'axios'

// Send user's cart to db
export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Read user's cart from db
export const getUserCart = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Empty user's cart from db
export const emptyUserCart = async authtoken =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Send user's address to db
export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Send coupon for validation in be
export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Send info from fe to create card order in db
export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Send info from fe to create cash order in db
export const createCashOrderBackend = async (authtoken, coupon, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: coupon, address: address },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Read user's orders from db
export const getUserOrders = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Add product to wishlist
export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Read user's wishlist from db
export const getWishlist = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Remove product form wishlist
export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
