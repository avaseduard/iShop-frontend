const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        <span>Order id: {order.paymentIntent.id} |</span>
        <span> Amount: ${(order.paymentIntent.amount / 100).toFixed(2)} |</span>
        <span> Method: {order.paymentIntent.payment_method_types[0]} |</span>
        <span> Payment status: {order.paymentIntent.status} | </span>
        <span>
          Order date:{' '}
          {new Date(order.paymentIntent.created * 1000).toLocaleDateString()} |
        </span>
        {showStatus && (
          <span className='badge bg-primary text-white'>
            {' '}
            Order status: {order.orderStatus}
          </span>
        )}
      </p>
    </div>
  )
}

export default ShowPaymentInfo
