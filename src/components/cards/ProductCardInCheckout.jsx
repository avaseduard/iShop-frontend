import ModalImage from 'react-modal-image'
import picture_unavailable from '../../images/picture_unavailable.jpg'
import { useDispatch } from 'react-redux'
import { setCart } from '../../store/reducers/cart.reducer'
import { toast } from 'react-toastify'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons'

const ProductCardInCheckout = ({ product }) => {
  const dispatch = useDispatch()

  // Update the quantity of the product from cart
  const handleQuantityChange = e => {
    const eventTargetValue = e.target.value < 1 ? 1 : e.target.value
    if (eventTargetValue > product.quantity) {
      toast.error(
        `Max available quantity for this item is ${product.quantity}.`
      )
      return
    }
    let cart = []
    if (localStorage.getItem('cart'))
      cart = JSON.parse(localStorage.getItem('cart'))
    cart.map((item, index) => {
      if (item._id === product._id) cart[index].count = eventTargetValue
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(setCart(cart))
  }

  const handleRemove = () => {
    let cart = []
    if (localStorage.getItem('cart'))
      cart = JSON.parse(localStorage.getItem('cart'))
    cart.map((item, index) => {
      if (item._id === product._id) cart.splice(index, 1)
      toast.error(`${item.title} has been removed from cart.`)
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(setCart(cart))
  }

  return (
    <tbody>
      <tr>
        <td scope='col'>
          <div style={{ height: 'auto' }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
                alt={product.title}
              />
            ) : (
              <ModalImage
                small={picture_unavailable}
                large={picture_unavailable}
                alt={product.title}
              />
            )}
          </div>
        </td>
        <td scope='col'>{product.title}</td>
        <td scope='col'>{product.price}</td>
        <td scope='col'>{product.brand}</td>
        <td scope='col'>{product.color}</td>
        <td scope='col' className='text-center'>
          <input
            type='number'
            value={product.count}
            onChange={handleQuantityChange}
            className='form-control'
          />
        </td>
        <td className='text-center' scope='col'>
          {product.shipping === 'Yes' ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <CloseCircleOutlined className='text-danger' />
          )}
        </td>
        <td className='text-center' scope='col'>
          <CloseOutlined
            onClick={handleRemove}
            className='text-danger pointer'
          />
        </td>
      </tr>
    </tbody>
  )
}

export default ProductCardInCheckout
