import axios from 'axios'

// First argument endpoint url, second argument is object data if we send in the body, third argument is object data we send in the headers
export const getAllOrders = async authtoken =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken: authtoken,
    },
  })

export const changeOrderStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
