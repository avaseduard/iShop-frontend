import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userCart } from '../functions/user'
import { setCashOnDelivery } from '../store/reducers/cod.reducer'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart, user } = useSelector(state => ({ ...state }))

  const cartLength = cart.cart.length

  const cartTotal = cart.cart
    .map(product => product.count * product.price)
    .reduce((a, b) => a + b, 0)

  // Save the order to db and redirect to checkout
  const saveOrderToDb = boolean => {
    // Set cash on delivery in redux to true/ false, depending on the button that has been clicked
    dispatch(setCashOnDelivery(boolean))
    userCart(cart.cart, user.user.token)
      .then(res => {
        if (res.data.ok) navigate('/checkout')
      })
      .catch(err => console.log('ORDER SAVED TO DB ERROR -->', err))
  }

  return (
    <div className='container-fluid pt-2'>
      {/* Shopping cart */}
      <div className='row'>
        <div className='col-md-8'>
          {!cartLength ? (
            <p>
              No products in cart. Start <Link to='/shop'>shopping</Link>.
            </p>
          ) : (
            <>
              <br />
              <h4>Shopping cart ({cartLength} items)</h4>
              <hr />
                <table className='table table-bordered table-responsive'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Image</th>
                      <th scope='col'>Title</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Brand</th>
                      <th scope='col'>Color</th>
                      <th scope='col'>Count</th>
                      <th scope='col'>Locker shipping</th>
                      <th scope='col'>Remove</th>
                    </tr>
                  </thead>
                    {cart.cart.map(product => (
                      <ProductCardInCheckout
                        key={product._id}
                        product={product}
                      />
                    ))}
                </table>
            </>
          )}
        </div>
        {/* Order summary */}
        <div className='col-md-4'>
          <br />
          <h4>Order summary</h4>
          <hr />
          <p>Products</p>
          {cart.cart.map((product, index) => (
            <div key={index}>
              <p>
                {product.title} x {product.count} = €
                {product.price * product.count}
              </p>
            </div>
          ))}
          <hr />
          TOTAL: <b>€{cartTotal}</b>
          <hr />
          {/* Buttons */}
          {user.user ? (
            <>
              <button
                onClick={() => saveOrderToDb(false)}
                disabled={!cartLength}
                className='btn btn-primary btn-sm mt-2'
              >
                Proceed to card checkout
              </button>
              <br />
              <button
                onClick={() => saveOrderToDb(true)}
                disabled={!cartLength}
                className='btn btn-secondary btn-sm mt-2'
              >
                Proceed to cash checkout
              </button>
            </>
          ) : (
            <Link to='/login' state={{ from: '/cart' }}>
              <button className='btn btn-primary btn-sm mt-2'>
                Login to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
