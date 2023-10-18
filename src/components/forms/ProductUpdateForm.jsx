import { Select } from 'antd'
const { Option } = Select

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  categories,
  colors,
  brands,
  subcategoryOptions,
  arrayOfSubcategoriesIds,
  setArrayOfSubcategoriesIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    // brands,
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
        />
      </div>

      <div className='form-group'>
        <label>Locker shipping</label>
        <select
          value={shipping}
          name='shipping'
          className='form-control'
          onChange={handleChange}
        >
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
        />
      </div>

      <div className='form-group'>
        <label>Color</label>
        <select
          value={color}
          name='color'
          className='form-control'
          onChange={handleChange}
        >
          {colors.length > 0 &&
            colors.map(color => (
              <option key={color._id} value={color.name}>
                {color.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Brand</label>
        <select
          value={brand}
          name='brand'
          className='form-control'
          onChange={handleChange}
        >
          {brands.length > 0 &&
            brands.map(brand => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          className='form-control'
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Subcategory</label>
        <Select
          mode='multiple'
          style={{
            width: '100%',
          }}
          placeholder='please select'
          value={arrayOfSubcategoriesIds}
          onChange={value => setArrayOfSubcategoriesIds(value)}
        >
          {subcategoryOptions.length &&
            subcategoryOptions.map(subcategory => (
              <Option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </Option>
            ))}
        </Select>
      </div>
      <br />

      <button className='btn btn-outline-info'>Save</button>
    </form>
  )
}

export default ProductUpdateForm
