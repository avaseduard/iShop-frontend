import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  applyCoupon,
  createCashOrderBackend,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../functions/user'
import { setCart } from '../store/reducers/cart.reducer'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { setCouponRedux } from '../store/reducers/coupon.reducer'
import { setCashOnDelivery } from '../store/reducers/cod.reducer'
import { listAllAddresses } from '../functions/address'
import { Input, Radio, Space } from 'antd'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState('')
  const [savedAddress, setSavedAddress] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')
  const { user, cashOnDelivery } = useSelector(state => ({ ...state }))

  useEffect(() => (loadUserCart(), loadAddresses()), [])

  const loadUserCart = () =>
    getUserCart(user.user.token).then(res => {
      // console.log(res.data.products)
      setProducts(res.data.products)
      // console.log(products)
      setTotal(res.data.cartTotal)
    })

  const loadAddresses = () => {
    setLoading(true)
    listAllAddresses(user.user.token)
      .then(res => {
        setLoading(false)
        setAddresses(res.data[0].addresses)
      })
      .catch(error => {
        setLoading(false)
        console.log('GET ADDRESSES FAILED IN FE -->', error)
      })
  }

  const onChange = e => setAddress(e.target.value)

  const saveAddressToDb = () => {
    saveUserAddress(user.user.token, address).then(res => {
      if (res.data.ok) {
        setSavedAddress(true)
        toast.success('Address has been saved')
      }
    })
  }

  const emptyCart = async () => {
    localStorage.removeItem('cart')
    dispatch(setCart([]))
    emptyUserCart(user.user.token).then(res => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      dispatch(setCouponRedux(false))
      toast.success('Cart is empty now.')
    })
  }

  const applyDiscountCoupon = () => {
    applyCoupon(user.user.token, coupon).then(res => {
      if (res.data) {
        setTotalAfterDiscount(res.data)
        dispatch(setCouponRedux(true))
      }
      if (res.data.err) {
        setDiscountError(res.data.err)
        dispatch(setCouponRedux(false))
      }
    })
  }

  const createCashOrder = () => {
    createCashOrderBackend(user.user.token, coupon, address).then(res => {
      // console.log('CREATED CASH ORDER -->', res)
      // Empty cart in local storage
      localStorage.removeItem('cart')
      // Empty cart in redux
      dispatch(setCart([]))
      // Reset coupon in redux
      dispatch(setCouponRedux(false))
      // Reset cupon form field
      setCoupon('')
      // Reset cod
      dispatch(setCashOnDelivery(false))
      // Empty cart in backend & redirect
      emptyUserCart(user.user.token).then(res => navigate('/user/history'))
    })
  }

  return (
    <div className='row px-3'>
      <div className='col-md-6'>
        <br />

        <h4>Delivery address</h4>
        <hr />
        <Radio.Group onChange={onChange}>
          <Space direction='vertical'>
            {addresses.map(addressOption => (
              <Radio
                key={addressOption._id}
                value={addressOption.location}
                className='h6'
              >
                {addressOption.location}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <br />
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Select
        </button>
        <hr />

        <h4>Got coupon?</h4>
        <input
          onChange={e => {
            setCoupon(e.target.value.toLocaleUpperCase())
            setDiscountError('')
          }}
          value={coupon}
          className='form-control'
          type='text'
        />
        <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
          Apply
        </button>
        <br />
        {discountError && <p className='text-danger p-2'>{discountError}</p>}
      </div>
      <div className='col-md-6'>
        <br />

        <h4>Order summary</h4>
        <hr />
        <p>{products.length} products in cart</p>
        <hr />
        {products.map((product, index) => (
          <div key={index}>
            <p>
              {product.product.title} ({product.color}) x {product.count} = $
              {product.count * product.product.price}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart total: ${total}</p>
        {totalAfterDiscount > 0 && (
          <p className='text-success'>
            Cart total after discount: ${totalAfterDiscount}
          </p>
        )}

        <div className='row'>
          <div className='col-md-6'>
            {cashOnDelivery.cashOnDelivery ? (
              <button
                disabled={!savedAddress || !products.length}
                className='btn btn-primary'
                onClick={createCashOrder}
              >
                Place order
              </button>
            ) : (
              <button
                disabled={!savedAddress || !products.length}
                className='btn btn-primary'
                onClick={() => navigate('/payment')}
              >
                Proceed to payment
              </button>
            )}
          </div>

          <div className='col-md-6'>
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className='btn btn-danger'
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
