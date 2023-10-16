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

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')
  const { user, cart } = useSelector(state => ({ ...state }))

  const logout = () => {
    auth.signOut()
    dispatch(
      logoutUser({
        user: null,
      })
    )
    navigate('/')
  }

  const menuItems = [
    {
      label: <IShopLogo style={{ width: '50px', height: '50px' }} />,
      key: 'logo',
    },
    {
      label: (
        <Link to='/' style={{ textDecoration: 'none' }}>
          Home
        </Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link to='/shop' style={{ textDecoration: 'none' }}>
          Shop
        </Link>
      ),
      key: 'shop',
      icon: <ShoppingOutlined />,
    },
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
    {
      label: 'User',
      key: 'user',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          children: [
            {
              label:
                user?.user?.role === 'subscriber' ? (
                  <Link to='/user/history' style={{ textDecoration: 'none' }}>
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to='/admin/dashboard'
                    style={{ textDecoration: 'none' }}
                  >
                    Dashboard
                  </Link>
                ),
              icon: <DashboardOutlined />,
            },
            {
              label: 'Logout',
              key: 'logout',
              icon: <LogoutOutlined />,
              onClick: () => {
                logout()
              },
            },
          ],
        },
      ],
    },
    {
      label: (
        // <Link to='/register' style={{ textDecoration: 'none' }}>
        //   Register
        // </Link>
        // <span>
        <Search />
        // </span>
      ),
      key: 'search',
      // icon: <UserAddOutlined />,
      // className: 'float-end',
      style: { margin: 'auto' },
    },
    {
      label: (
        <Link to='/register' style={{ textDecoration: 'none' }}>
          Register
        </Link>
      ),
      key: 'register',
      icon: <UserAddOutlined />,
      // className: 'float-end',
      style: { marginLeft: 'auto' },
    },
    {
      label: (
        <Link to='/login' style={{ textDecoration: 'none' }}>
          Login
        </Link>
      ),
      key: 'login',
      icon: <UserOutlined />,
      // className: 'float-end',
    },
  ]

  const onClick = e => {
    setCurrent(e.key)
  }

  return (
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={menuItems}
      />
  )
}
export default Header
