import { Link } from 'react-router-dom'

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subcategories,
    shipping,
    quantity,
    brand,
    color,
    sold,
  } = product

  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Price{' '}
        <span className='badge badge-success m-1 float-right'>$ {price}</span>
      </li>

      <li className='list-group-item'>
        Category{' '}
        <Link
          to={`/category/${category?.slug}`}
          className='badge badge-primary m-1 float-right'
        >
          {category?.name}
        </Link>
      </li>

      <li className='list-group-item'>
        Subcategory{' '}
        {subcategories?.map(subcategory => (
          <Link
            key={subcategory._id}
            to={`/subcategory/${subcategory.slug}`}
            className='badge badge-primary m-1 float-right'
          >
            {subcategory.name}
          </Link>
        ))}
      </li>

      <li className='list-group-item'>
        Brand <span className='badge badge-info m-1 float-right'>{brand}</span>
      </li>

      <li className='list-group-item'>
        Color <span className='badge badge-info m-1 float-right'>{color}</span>
      </li>

      <li className='list-group-item'>
        Available{' '}
        <span className='badge badge-info m-1 float-right'>{quantity}</span>
      </li>

      <li className='list-group-item'>
        Locker shipping{' '}
        <span className='badge badge-info m-1 float-right'>{shipping}</span>
      </li>

      <li className='list-group-item'>
        Sold <span className='badge badge-info m-1 float-right'>{sold}</span>
      </li>
    </ul>
  )
}

export default ProductListItems
