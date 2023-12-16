import ShowPaymentInfo from '../cards/ShowPaymentInfo'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const Orders = ({ orders, handleStatusChange }) => {
  return orders.map(order => (
    <div key={order._id} className='pb-5'>
      <div className='row'>
        <ShowPaymentInfo order={order} showStatus={false} />
      </div>
      <br />
      <table className='table table-bordered table-responsive'>
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
      <br />

      <div className='row'>
        <div className='col-md-4'>Delivery status</div>
        <div className='col-md-8'>
          <select
            onChange={e => handleStatusChange(order._id, e.target.value)}
            className='form-control'
            defaultValue={order.orderStatus}
            name='status'
          >
            <option value='Received'>Received</option>
            <option value='Processing'>Processing</option>
            <option value='Sent'>Sent</option>
            <option value='Cancelled'>Cancelled</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  ))
}

export default Orders
