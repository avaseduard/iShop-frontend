import axios from 'axios'

// Create new color
export const createAddress = async (address, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/address`,
    { address },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// List all colors
export const listAllAddresses = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/addresses`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Remove one color
export const removeAddress = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/address/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get one address
export const getAddress = async (slug, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/address/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Update one address
export const addressUpdate = async (slug, address, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/address/${slug}`, address, {
    headers: {
      authtoken: authtoken,
    },
  })
