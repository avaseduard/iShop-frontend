import { Link } from 'react-router-dom'

const AdminNav = () => (
  <nav>
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to='/admin/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/product' className='nav-link'>
          Product
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/products' className='nav-link'>
          Products
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/category' className='nav-link'>
          Category
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/subcategory' className='nav-link'>
          Subcategory
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/colors' className='nav-link'>
          Colors
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/brands' className='nav-link'>
          Brands
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/coupon' className='nav-link'>
          Coupon
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/admin/carousel-manager' className='nav-link'>
          Carousel Manager
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

export default AdminNav
