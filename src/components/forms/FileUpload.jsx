import Resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import { Avatar, Badge, Button } from 'antd'
import {
  removeCloudinaryImage,
  uploadCloudinaryImage,
} from '../../functions/cloudinary'
import { useState } from 'react'

const FileUpload = ({ values, setValues, setLoading }) => {
  const [disabled, setDisabled] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  // Upload image file to cloudinary and set the new image array to values state
  const fileUploadAndResize = e => {
    let files = e.target.files
    let allUploadedFiles = values.images
    // Resize
    if (files) {
      setLoading(true)
      for (let index = 0; index < files.length; index++) {
        Resizer.imageFileResizer(
          files[index],
          720,
          720,
          'JPEG',
          100,
          0,
          uri => {
            // Send to server
            uploadCloudinaryImage(uri, user.user.token)
              // Get url response from server
              .then(res => {
                setLoading(false)
                // Set url to images array in product create state
                allUploadedFiles.push(res.data)
                // Set all images array to the state
                setValues({ ...values, images: allUploadedFiles })
              })
              .catch(err => {
                console.log('PRODUCT IMAGE UPLOAD FAILED -->', err)
                setLoading(false)
              })
          },
          'base64'
        )
      }
    }
  }

  // Remove image from cloudinary and set the new image array to values state
  const handleImageRemove = id => {
    setLoading(true)
    // Send image id (and token) to back end
    removeCloudinaryImage(id, user.user.token)
      .then(res => {
        setLoading(false)
        // Remove image with matching id from images
        const { images } = values
        const filteredImages = images.filter(image => {
          return image.public_id !== id
        })
        // Set the state to remaining images (all except the removed one)
        setValues({ ...values, images: filteredImages })
      })
      .catch(err => {
        setLoading(false)
        console.log('IMAGE REMOVE FAILED -->', err)
      })
  }

  // When 'set main' button is clicked on an image, move it to the beginning of images array and update the state
  const setMainImage = imageId => {
    setLoading(true)
    let reorderedImages = [...values.images]
    const index = reorderedImages.findIndex(
      image => image.public_id === imageId
    )
    reorderedImages.unshift(reorderedImages.splice(index, 1)[0])
    setValues({ ...values, images: reorderedImages })
    setLoading(false)
  }

  return (
    <>
      <div className='row'>
        {values.images &&
          values.images.map((image, index) => (
            <div
              key={image.public_id}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Badge
                count='X'
                style={{ cursor: 'pointer' }}
                offset={[-20, 20]}
                onClick={() => handleImageRemove(image.public_id)}
              >
                <Avatar
                  src={image.url}
                  size={90}
                  shape='square'
                  className='m-3'
                />
              </Badge>
              <Button
                onClick={() => setMainImage(image.public_id)}
                type='default'
                size='small'
                disabled={index === 0}
              >
                {index === 0 ? 'Main image' : 'Set main'}
              </Button>
            </div>
          ))}
      </div>
      <br />
      <div className='row'>
        <label className='btn btn-primary'>
          Choose file
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  )
}

export default FileUpload
