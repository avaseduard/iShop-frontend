import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserOrders } from '../../functions/user'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo'
import UserNav from '../../components/nav/UserNav'
import Invoice from '../../components/order/Invoice'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
      loadUserOrders()
  }, [])

  const loadUserOrders = () =>
    getUserOrders(user.user.token).then(res => setOrders(res.data))

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>

        <div className='col text-center'>
          <br />
          <h4>
            {orders.length > 0 ? `${orders.length} orders` : 'No orders yet'}
          </h4>
          <hr />

          {orders.map((order, index) => (
            <div key={index} className='m-5 p-3 card'>
              <ShowPaymentInfo order={order} />

              <table className='table table-bordered'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Brand</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Count</th>
                    <th scope='col'>Locker shipping</th>
                  </tr>
                </thead>

                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <b>{item.product.title}</b>
                      </td>
                      <td>{item.product.price}</td>
                      <td>{item.product.brand}</td>
                      <td>{item.color}</td>
                      <td>{item.count}</td>
                      <td>
                        {item.product.shipping === 'Yes' ? (
                          <CheckCircleOutlined style={{ color: 'green' }} />
                        ) : (
                          <CloseCircleOutlined style={{ color: 'red' }} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='row'>
                <div className='col'>
                  <PDFDownloadLink
                    document={<Invoice order={order} />}
                    fileName='invoice.pdf'
                    className='btn btn-sm btn-block btn-outline-primary'
                  >
                    Download PDF
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History
