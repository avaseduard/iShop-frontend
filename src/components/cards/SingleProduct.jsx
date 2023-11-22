import { Card, Tabs, Tooltip } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ProductListItems from './ProductListItems'
import StarRatings from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setCart } from '../../store/reducers/cart.reducer'
import _ from 'lodash'
import { setDrawerVisibility } from '../../store/reducers/drawer.reducer'
import { addToWishlist } from '../../functions/user'
import { toast } from 'react-toastify'
import showAverageRating from '../rating/ShowAverageRating'

const { Meta } = Card

const SingleProduct = ({ product, onStarClick, star }) => {
  const dispatch = useDispatch()
  const [tooltip, setTooltip] = useState('Buy')
  const { title, images, description, _id } = product
  const { user } = useSelector(state => ({ ...state }))

  // Add to cart functionality
  const handleAddToCart = () => {
    let cartItems = []
    // If there's a cart already in local storage, get it
    if (localStorage.getItem('cart'))
      cartItems = JSON.parse(localStorage.getItem('cart'))
    // If there's no cart in local storage, push the item
    cartItems.push({ ...product, count: 1 })
    // Remove duplicates
    const cartWithUniqueItems = _.uniqWith(cartItems, _.isEqual)
    // Save to local storage
    localStorage.setItem('cart', JSON.stringify(cartWithUniqueItems))
    // Show tooltip
    setTooltip('Added')
    // Save to redux state
    dispatch(setCart(cartWithUniqueItems))
    // Set side drawer to visible
    dispatch(setDrawerVisibility(true))
  }

  const handleAddToWishlist = e => {
    e.preventDefault()
    addToWishlist(product._id, user.user.token).then(res =>
      toast.success(`'${product.title}' added to wishlist`)
    )
  }

  return (
    <>
      <div className='col-md-7'>
        {images?.length ? (
          <Carousel
            width='560px'
            showArrows={false}
            showStatus={false}
            autoPlay
            infiniteLoop={true}
          >
            {images.map(image => (
              <img src={image.url} key={image.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={pictureunavailable}
                style={{ height: '560px', objectFit: 'cover' }}
                className='p-1'
              />
            }
          />
        )}

        <Tabs
          defaultActiveKey='1'
          type='card'
          size='small'
          items={[
            {
              label: 'Description',
              key: 1,
              children: `${description}`,
            },
            {
              label: 'More',
              key: 2,
              children:
                'If you would like to learn more, give us a call on 0123 456 789!',
            },
          ]}
        />
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>

        {product.ratings?.length > 0 ? (
          showAverageRating(product)
        ) : (
          <div className='text-center pt-2 pb-3'>No rating yet</div>
        )}

        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className='text-danger' />
                  <br />
                </a>
                Add to cart
              </Tooltip>
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className='text-info' /> <br /> Add to wishlist
              </a>
              <RatingModal>
                <StarRatings
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  starRatedColor='blue'
                  isSelectable={true}
                  starDimension='24px'
                  changeRating={onStarClick}
                />
              </RatingModal>
            </>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
