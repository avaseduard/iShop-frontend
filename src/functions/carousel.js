import axios from 'axios'

// Send image url to be
export const sendImageUrl = async (imageUrl, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/carousel-image`, imageUrl, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get all images' urls from be
export const getAllImagesUrls = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/carousel-images`, {
    headers: {
      authtoken: authtoken,
    },
  })

// Get all images' urls from be
export const removeCarouselImage = async (imageId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/remove-carousel-image`,
    { imageId },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
