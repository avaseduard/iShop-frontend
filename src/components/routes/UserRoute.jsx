import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoute = ({ children }) => {
  // Get the user from state
  const { user } = useSelector(state => ({ ...state }))

  // If the user isn't logged in, redirect to login and protect route
  return user?.user?.token ? <Outlet /> : <Navigate to='/login' />
}

export default UserRoute
