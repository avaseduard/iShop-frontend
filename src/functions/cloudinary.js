import axios from 'axios'

// Upload image to cloudinary, based on image uri
export const uploadCloudinaryImage = async (uri, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/uploadimages`,
    { image: uri },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )

// Remove image fro cloudinary, based on public id
export const removeCloudinaryImage = async (imageId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/removeimage`,
    { public_id: imageId },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
