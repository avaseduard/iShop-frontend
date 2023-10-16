import { useEffect, useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () =>
    getWishlist(user.user.token).then(res => setWishlist(res.data.wishlist))

  const handleRemove = (productId) =>
    removeWishlist(productId, user.user.token).then(res => loadWishlist())

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>

        <div className='col'>
          <br />
          <h4>Wishlist</h4>
          <hr />

          {wishlist.length ? wishlist.map(product => (
            <div key={product._id} className='alert alert-secondary'>
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
              <span
                className='btn btn-sm float-right'
                onClick={() => handleRemove(product._id)}
              >
                <DeleteOutlined />
              </span>
            </div>
          )) : 'You have no items saved in your wishlist.'}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
