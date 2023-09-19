import axios from 'axios'

// Create new product
export const sendImageUrl = async (imageUrl, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/carousel-image`, imageUrl, {
    headers: {
      authtoken: authtoken,
    },
  })
