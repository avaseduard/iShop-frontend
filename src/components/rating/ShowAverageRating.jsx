import StarRatings from 'react-star-ratings'

const ShowAverageRating = product => {
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
          starDimension='28px'
        />{' '}
        (
        {product.ratings.length > 1
          ? `${product.ratings.length} ratings`
          : `${product.ratings.length} rating`}
        )
      </span>
    </div>
  )
}

export default ShowAverageRating
