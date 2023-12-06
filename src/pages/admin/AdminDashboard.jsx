import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { changeOrderStatus, getAllOrders } from '../../functions/admin'
import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/Orders'
import { toast } from 'react-toastify'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () =>
    getAllOrders(user.user.token).then(res => {
      setOrders(res.data)
    })

  const handleStatusChange = (orderId, orderStatus) => {
    changeOrderStatus(orderId, orderStatus, user.user.token).then(res => {
      toast.success(
        `Order id '${orderId}' status has been updated to '${orderStatus}'`
      )
      loadOrders()
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          <br />
          <h4>Admin dashboard</h4>
          <hr />

          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
