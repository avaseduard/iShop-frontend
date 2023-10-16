import StarRatings from 'react-star-ratings'

const Star = ({ starClick, numberOfStars }) => (
  <StarRatings
    changeRating={() => starClick(numberOfStars)}
    numberOfStars={numberOfStars}
    starDimension='16px'
    // starRatedColor='blue'
    starHoverColor='blue'
    starEmptyColor='blue'
    // isSelectable={true}
  />
)

export default Star
