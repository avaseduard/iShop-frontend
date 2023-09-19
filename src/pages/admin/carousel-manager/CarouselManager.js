import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { Avatar, Badge } from 'antd'
import AdminNav from '../../../components/nav/AdminNav'
import { sendImageUrl } from '../../../functions/carousel'
import { toast } from 'react-toastify'

const CarouselManager = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

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
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user.user.token,
                  },
                }
              )
              // Get url response from server
              .then(res => {
                // Send urls to database
                sendImageUrl(res.data, user.user.token)
                  .then(response => {
                    if (response.data.ok)
                      toast.success('Carousel image uploaded')
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

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Admin navigation bar */}
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          {/* Title */}
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Carousel Manager</h4>
          )}

          {/* Gallery */}
          <div className='row'>
            {/* {values.images && */}
            {/* values.images.map(image => ( */}
            <Badge
              count='X'
              // key={image.public_id}
              style={{ cursor: 'pointer' }}
              // onClick={() => handleImageRemove(image.public_id)}
            >
              <Avatar
                // src={image.url}
                size={90}
                shape='square'
                className='m-3'
              />
            </Badge>
            {/* ))} */}
          </div>

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
