import StarRatings from 'react-star-ratings'

export const showAverageRating = product => {
  const rating = product?.ratings?.length
    ? product.ratings.reduce((result, rating) => result + rating.star, 0) /
      product.ratings.length
    : 0

  return (
    <div className='text-center pt-1 pb-3'>
      <span>
        <StarRatings
          rating={rating}
          // numberOfStars={5}
          starRatedColor='blue'
          starDimension='24px'
        />{' '}
        ({product.ratings.length})
      </span>
    </div>
  )
}
