import { Card, Skeleton } from 'antd'

const LoadingCard = ({ limit }) => (
  <div className='row pb-5'>
    {Array(limit)
      .fill(true)
      .map((_, i) => (
        <Card key={i} className='col-md-4'>
          <Skeleton active />
        </Card>
      ))}
  </div>
)

export default LoadingCard
