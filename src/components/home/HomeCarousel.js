import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllImagesUrls } from '../../functions/carousel'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const HomeCarousel = () => {
  const { user } = useSelector(state => ({ ...state }))
  const [images, setImages] = useState([])

  useEffect(() => {
    loadImages()
  }, [])

  // Load all carousel images from db
  const loadImages = () =>
    getAllImagesUrls(user.user.token)
      .then(res => {
        setImages(res.data.map(image => image.images))
      })
      .catch(error => console.log('GET ALL IMAGES FAILED FE -->', error))

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      className='text-center mt-5'
    >
      {images.map(image => (
        <SwiperSlide key={image.public_id}>
          <img src={image.url} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeCarousel
