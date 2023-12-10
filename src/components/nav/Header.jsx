import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { Badge, Menu } from 'antd'
import {
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { logoutUser } from '../../store/reducers/user.reducer'
import Search from '../forms/Search'
import { ReactComponent as IShopLogo } from '../../images/logo-color.svg'
import { toast } from 'react-toastify'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')
  const { user, cart } = useSelector(state => ({ ...state }))

  // Logout functionality
  const logout = () => {
    auth.signOut()
    dispatch(
      logoutUser({
        user: null,
      })
    )
    navigate('/')
    toast.error('You have been logged out')
  }

  // Ant design menu items
  const menuItems = [
    // Website logo
    {
      label: <IShopLogo style={{ width: '50px', height: '50px' }} />,
      key: 'logo',
    },
    // Home button
    {
      label: (
        <Link to='/' style={{ textDecoration: 'none' }}>
          Home
        </Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
    },
    // Shop button
    {
      label: (
        <Link to='/shop' style={{ textDecoration: 'none' }}>
          Shop
        </Link>
      ),
      key: 'shop',
      icon: <ShoppingOutlined />,
    },
    // Cart button
    {
      label: (
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <Badge count={cart.cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      ),
      key: 'cart',
      icon: <ShoppingCartOutlined />,
    },
    // Search input field and button
    {
      label: <Search />,
      key: 'search',
      style: { margin: 'auto' },
    },
    // Dashboard/ register button
    user?.user?.token
      ? {
          label:
            user?.user?.role === 'admin' ? (
              <Link to='/admin/dashboard' style={{ textDecoration: 'none' }}>
                Dashboard
              </Link>
            ) : (
              <Link to='/user/history' style={{ textDecoration: 'none' }}>
                Dashboard
              </Link>
            ),
          icon: <DashboardOutlined />,
        }
      : {
          label: (
            <Link to='/register' style={{ textDecoration: 'none' }}>
              Register
            </Link>
          ),
          key: 'register',
          icon: <UserAddOutlined />,
          style: { marginLeft: 'auto' },
        },
    // Login/ Logout button
    user?.user?.token
      ? {
          label: 'Logout',

          key: 'logout',
          icon: <LogoutOutlined />,
          onClick: () => logout(),
        }
      : {
          label: (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              Login
            </Link>
          ),
          key: 'login',
          icon: <UserOutlined />,
        },
  ]

  return (
    <Menu
      onClick={e => setCurrent(e.key)}
      selectedKeys={[current]}
      mode='horizontal'
      items={menuItems}
    />
  )
}
export default Header
