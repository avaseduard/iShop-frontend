import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from 'antd'
import { setDrawerVisibility } from '../../store/reducers/drawer.reducer'
import picture_unavailable from '../../images/picture_unavailable.jpg'
import { Link } from 'react-router-dom'

const SideDrawer = () => {
  const dispatch = useDispatch()
  const { cart, drawer } = useSelector(state => ({ ...state }))

  return (
    <Drawer
      className='text-center'
      title={`Shopping cart (${cart.cart.length} items)`}
      onClose={() => dispatch(setDrawerVisibility(false))}
      open={drawer.drawer}
    >
      {cart.cart.map(product => (
        <div key={product._id} className='row'>
          <div className='col'>
            {product.images[0] ? (
              <>
                <img src={product.images[0].url} style={{ width: '50%' }} />
                <p className='text-center bg-secondary text-light'>
                  {product.title} x {product.count}
                </p>
              </>
            ) : (
              <>
                <img src={picture_unavailable} style={{ width: '50%' }} />
                <p className='text-center bg-secondary text-light'>
                  {product.title} x {product.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to='/cart'>
        <button
          onClick={() => dispatch(setDrawerVisibility(false))}
          className='text-center btn btn-primary btn-raised btn-block'
        >
          Go to cart
        </button>
      </Link>
    </Drawer>
  )
}

export default SideDrawer
