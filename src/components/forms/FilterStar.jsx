import Rating from '@mui/material/Rating'

const FilterStar = ({ star, handleStar }) => (
  <Rating name='simple-controlled' value={star} onChange={handleStar} />
)

export default FilterStar
