import { Select } from 'antd'
const { Option } = Select

const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  handleCategoryChange,
  subcategoryOptions,
  showSubcategories,
  values,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values

  return (
    <form onSubmit={handleSubmit}>

      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          className='form-control'
          value={title}
          onChange={handleChange}
          placeholder="Enter item's title"
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={handleChange}
          placeholder="Enter item's description"
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          className='form-control'
          value={price}
          onChange={handleChange}
          placeholder="Enter item's price"
        />
      </div>

      <div className='form-group'>
        <label>Locker shipping</label>
        <select
          name='shipping'
          className='form-control'
          onChange={handleChange}
        >
          <option>Choose shipping</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          type='number'
          name='quantity'
          className='form-control'
          value={quantity}
          onChange={handleChange}
          placeholder="Enter item's quantity"
        />
      </div>

      <div className='form-group'>
        <label>Color</label>
        <select name='color' className='form-control' onChange={handleChange}>
          <option>Choose item's color</option>
          {colors.map(color => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Brand</label>
        <select name='brand' className='form-control' onChange={handleChange}>
          <option>Choose item's brand</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          onChange={handleCategoryChange}
          className='form-control'
        >
          <option>Choose item's category</option>
          {categories.length > 0 &&
            categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {showSubcategories && (
        <div>
          <label>Subcategory</label>
          <Select
            mode='multiple'
            style={{
              width: '100%',
            }}
            placeholder="Choose item's subcategory"
            value={subcategories}
            onChange={value => setValues({ ...values, subcategories: value })}
          >
            {subcategoryOptions.length &&
              subcategoryOptions.map(subcategory => (
                <Option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <br />

      <button className='btn btn-outline-info'>Save</button>
    </form>
  )
}

export default ProductCreateForm
