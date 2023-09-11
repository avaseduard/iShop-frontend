import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useSelector(state => ({ ...state }))

  // Check for user token in redux store and for the admin check in backend
  useEffect(() => {
    if (user?.user?.token) {
      currentAdmin(user?.user?.token)
        .then(res => {
          // console.log('CURRENT ADMIN', res)
          setLoading(false)
          setOk(true)
        })
        .catch(error => {
          console.log('ADMIN ROUTE ERROR', error)
          setLoading(false)
          setOk(false)
        })
    }
  }, [user])

  // While waiting for the user from Redux and backend, show loading
  if (loading) {
    return <>Loading...</>
  }

  // If the user is not an admin, redirect to home and protect the admin route
  return ok ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute
