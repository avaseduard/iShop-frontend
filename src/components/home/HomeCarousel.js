import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const HomeCarousel = () => {
  const images = [
    'https://res.cloudinary.com/dfhouyv7c/image/upload/v1686200329/lainltwfdomhupizafw0.jpg',
    'https://res.cloudinary.com/dfhouyv7c/image/upload/v1685715823/nrmupgj6krc8v8peoqhm.jpg',
    'https://res.cloudinary.com/dfhouyv7c/image/upload/v1685707116/zmuvhqutwaodpwjhfsnp.jpg',
  ]

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className='text-center'
    >
      {images.map(image => (
        <SwiperSlide key={image}>
          <img src={image} alt='' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeCarousel
