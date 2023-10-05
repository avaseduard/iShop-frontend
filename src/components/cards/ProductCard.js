import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'
import { showAverageRating } from '../../functions/rating'
import _ from 'lodash'
import { setCart } from '../../store/reducers/cart.reducer'
import { setDrawerVisibility } from '../../store/reducers/drawer.reducer'

const { Meta } = Card

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  // const { cart } = useSelector(state => ({ ...state }))
  const [tooltip, setTooltip] = useState('Buy')
  const { title, description, images, slug, price } = product

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

  return (
    <>
      {product.ratings?.length > 0 ? (
        showAverageRating(product)
      ) : (
        <>
          <div className='text-center pt-2 pb-3'>No rating yet</div>
          <br />
        </>
      )}

      <Card
        cover={
          <img
            src={!images[0]?.url ? pictureunavailable : images[0]?.url}
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
          />
        }
        actions={[
          <Link relative='path' to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' />
            <br />
            View product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className='text-danger' />
              <br />
              {product.quantity < 1 ? 'Out of stock' : 'Add to cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - €${price}`}
          description={`${description?.substring(0, 40)}...`}
        />
      </Card>
    </>
  )
}

export default ProductCard
