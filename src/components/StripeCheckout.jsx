import { useDispatch, useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPaymentIntent } from '../functions/stripe'
import { setCart } from '../store/reducers/cart.reducer'
import { setCouponRedux } from '../store/reducers/coupon.reducer'
import { createOrder, emptyUserCart } from '../functions/user'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import logo from '../images/logo-color.svg'

const StripeCheckout = () => {
  const dispatch = useDispatch()
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)
  const { user, coupon } = useSelector(state => ({ ...state }))

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    createPaymentIntent(user.user.token, coupon.coupon).then(res => {
      setClientSecret(res.data.clientSecret)
      setCartTotal(res.data.cartTotal)
      setTotalAfterDiscount(res.data.totalAfterDiscount)
      setPayable(res.data.payable)
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setProcessing(true)
    // Stripe payment details
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed - ${payload.error.message}`)
      setProcessing(false)
    } else {
      setProcessing(false)
      setError(null)
      setSucceeded(true)
      createOrder(payload, user.user.token).then(res => {
        if (res.data.ok) {
          // empty cart for local storage
          localStorage.removeItem('cart')
          // empty cart form redux
          dispatch(setCart([]))
          // empty cart from db
          emptyUserCart(user.user.token)
          // set coupon to false
          dispatch(setCouponRedux(false))
        }
      })
    }
  }

  const handleChange = async e => {
    // Disable the pay button if there are errors
    setDisabled(e.empty)
    // Show error message if there is
    setError(e.error ? e.error.message : '')
  }

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount ? (
            <p className='alert alert-success'>{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className='alert alert-danger'>No coupon applied</p>
          )}
        </div>
      )}

      <div className='text-center pb-5'>
        <Card
          cover={
            <img
              src={logo}
              style={{
                height: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className='text-info' /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <DollarOutlined className='text-info' /> <br /> Payable: $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={succeeded || disabled || processing}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        <br />

        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        <br />

        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment successful.{' '}
          <Link to='/user/history'>Check order in purchase history.</Link>
        </p>
      </form>
    </>
  )
}

export default StripeCheckout
