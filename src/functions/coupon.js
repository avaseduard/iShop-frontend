import axios from 'axios'

// List all coupons
export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`)

// Remove a coupon
export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Remove a coupon
export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
