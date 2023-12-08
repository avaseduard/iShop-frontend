import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Skeleton } from 'antd'

const LoadingCard = ({ limit }) => (
  <div className='row pb-5'>
    {Array(limit)
      .fill(true)
      .map((_, i) => (
        <Card
          key={i}
          className='col-md-4'
          actions={[
            <>
              <EyeOutlined className='text-warning' />
              <br />
              View product
            </>,
            <>
              <ShoppingCartOutlined className='text-danger' />
              <br />
              Add to cart
            </>,
          ]}
        >
          <Skeleton
            active
            style={{
              height: 300,
            }}
          />
        </Card>
      ))}
  </div>
)

export default LoadingCard
