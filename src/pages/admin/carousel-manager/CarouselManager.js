import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { Avatar, Badge } from 'antd'
import AdminNav from '../../../components/nav/AdminNav'
import {
  getAllImagesUrls,
  removeCarouselImage,
  sendImageUrl,
} from '../../../functions/carousel'
import { toast } from 'react-toastify'
import {
  removeCloudinaryImage,
  uploadCloudinaryImage,
} from '../../../functions/cloudinary'

const CarouselManager = () => {
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadImages()
  }, [])

  // Load all carousel images from db
  const loadImages = () =>
    getAllImagesUrls(user.user.token)
      .then(res => {
        const images = []
        res.data.map(image => images.push(image.images))
        setAllImages(images)
      })
      .catch(error => console.log('GET ALL IMAGES FAILED FE -->', error))

  // Upload images, resize, upload to cloudinary and send the urls to db
  const imageUploadAndResize = e => {
    let files = e.target.files
    // Resize
    if (files) {
      setLoading(true)
      for (let index = 0; index < files.length; index++) {
        Resizer.imageFileResizer(
          files[index],
          1000,
          480,
          'JPEG',
          100,
          0,
          uri => {
            // Send to server
            uploadCloudinaryImage(uri, user.user.token)
              // Get url response from server
              .then(res => {
                // Send urls to database
                sendImageUrl(res.data, user.user.token)
                  .then(response => {
                    if (response.data.ok) {
                      // Show confirmation message
                      toast.success('Carousel image uploaded')
                      // Reload all images
                      loadImages()
                    }
                  })
                  .catch(error => {
                    console.log(
                      'CAROUSEL IMAGE UPLOAD TO DB FAILED FE -->',
                      error
                    )
                  })
                setLoading(false)
              })
              .catch(err => {
                console.log('CAROUSEL IMAGE RESIZE FAILED FE -->', err)
                setLoading(false)
              })
          },
          'base64'
        )
      }
    }
  }

  const handleImageRemove = imageId => {
    setLoading(true)
    // Remove image from cloudinary
    removeCloudinaryImage(imageId, user.user.token)
      .then(res => {
        setLoading(false)
        // Show confirmation message
        toast.error('Carousel image removed successfuly')
        // Remove image with matching id from images
        const filteredImages = allImages.filter(image => {
          return image.public_id !== imageId
        })
        // Set the state to remaining images (all except the removed one)
        setAllImages(filteredImages)
        // Remove image from db
        removeCarouselImage(imageId, user.user.token).then(res => {
          // Reload all images
          if (res.data.ok) loadImages()
        })
      })
      .catch(err => {
        setLoading(false)
        console.log('CAROUSEL IMAGE REMOVE FAILED FE -->', err)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Admin navigation bar */}
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          <br />
          {/* Title */}
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Carousel Manager</h4>
          )}
          <hr />
          {/* Gallery */}
          <div className='row'>
            {allImages &&
              allImages.map(image => (
                <Badge
                  count='X'
                  key={image.public_id}
                  style={{ cursor: 'pointer' }}
                  offset={[-20, 20]}
                  onClick={() => handleImageRemove(image.public_id)}
                >
                  <Avatar
                    src={image.url}
                    size={120}
                    shape='square'
                    className='m-3'
                  />
                </Badge>
              ))}
          </div>
          <hr />
          {/* Add image */}
          <div className='row'>
            <label className='btn btn-primary'>
              Choose file
              <input
                type='file'
                multiple
                hidden
                accept='images/*'
                onChange={imageUploadAndResize}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselManager
