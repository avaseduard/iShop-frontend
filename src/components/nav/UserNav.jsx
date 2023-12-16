import { Link } from 'react-router-dom'

const UserNav = () => (
  <nav>
    <ul className='nav flex-md-row flex-lg-column justify-content-between'>
      <li className='nav-item'>
        <Link to='/user/history' className='nav-link'>
          History
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/user/wishlist' className='nav-link'>
          Wishlist
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/user/addresses' className='nav-link'>
          Addresses
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/user/password' className='nav-link'>
          Password
        </Link>
      </li>
    </ul>
  </nav>
)

export default UserNav
