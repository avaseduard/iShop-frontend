import { useEffect, useState } from 'react'
import { fetchProductsbyFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubcategories } from '../functions/subcategory'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Menu, Radio, Slider } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  DollarOutlined,
  DownSquareOutlined,
  DropboxOutlined,
  SketchOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { setSearch } from '../store/reducers/search.reducer'
import Star from '../components/forms/Star'

const Shop = () => {
  const dispatch = useDispatch()
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [price, setPrice] = useState([0, 9999])
  const [star, setStar] = useState('')
  const [subcategories, setSubcategories] = useState([])
  const [subcategory, setSubcategory] = useState('')
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ])
  const [selectedColor, setSelectedColor] = useState('')
  const [shipping, setShipping] = useState('')

  const fetchProducts = argument => {
    fetchProductsbyFilter(argument).then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  // Load products and categories by default when page loads
  useEffect(() => {
    loadAllProducts()
    loadCategories()
    loadSubcategories()
  }, [])
  //
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }
  //
  const loadCategories = () => {
    setLoading(true)
    getCategories().then(res => {
      setCategories(res.data)
      setLoading(false)
    })
  }
  //
  const loadSubcategories = () => {
    setLoading(true)
    getSubcategories().then(res => {
      setSubcategories(res.data)
      setLoading(false)
    })
  }

  // Load products based on user search input
  useEffect(() => {
    setLoading(true)
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    if (!text) loadAllProducts()
    return () => clearTimeout(delayed)
  }, [text])

  // Load products based on price slider filter with a delay of 300 ms
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price: price })
    }, 300)
    return () => clearTimeout(delayed)
  }, [price])
  //
  const handleSlider = value => {
    dispatch(setSearch(''))
    setCategoryIds([])
    setPrice(value)
  }

  // Load categories based on checkbox filter
  const handleCheck = e => {
    dispatch(setSearch(''))
    const inTheState = [...categoryIds]
    const justChecked = e.target.value
    const foundInTheState = inTheState.indexOf(justChecked) // index or -1
    // If the category id is not found in the state, add it, if it's found, remove it
    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)
    fetchProducts({ category: inTheState })
  }

  // Load products based on rating
  const handleStarClick = number => {
    dispatch(setSearch(''))
    setStar(number)
    fetchProducts({ stars: number })
  }

  // Load products based on subcategory
  const handleSubcategory = subcategory => {
    dispatch(setSearch(''))
    setSubcategory(subcategory)
    fetchProducts({ subcategory: subcategory })
  }

  // Load products based on brand
  const handleBrand = e => {
    dispatch(setSearch(''))
    setSelectedBrand(e.target.value)
    fetchProducts({ brand: e.target.value })
  }

  // Load products based on color
  const handleColor = e => {
    dispatch(setSearch(''))
    setSelectedColor(e.target.value)
    fetchProducts({ color: e.target.value })
  }

  // Load products based on shipping
  const handleShipping = e => {
    dispatch(setSearch(''))
    setShipping(e.target.value)
    fetchProducts({ shipping: e.target.value })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-3'>
          <h4>Filter</h4>
          <hr />

          <Menu
            mode='inline'
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
          >
            {/* Price filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <DollarOutlined className='align-bottom pb-3' /> Price $
                </span>
              }
              key={1}
            >
              <div>
                <Slider
                  range
                  value={price}
                  onChange={handleSlider}
                  // defaultValue={[0, 9999]}
                  max='9999'
                  className='ml-4 mr-4'
                />
              </div>
            </SubMenu>

            {/* Rating filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <StarOutlined className='align-bottom pb-3' /> Rating
                </span>
              }
              key={'3'}
            >
              <div className='pr-4 pb4 pl-2'>
                <Star starClick={handleStarClick} numberOfStars={5} />
                <Star starClick={handleStarClick} numberOfStars={4} />
                <Star starClick={handleStarClick} numberOfStars={3} />
                <Star starClick={handleStarClick} numberOfStars={2} />
                <Star starClick={handleStarClick} numberOfStars={1} />
              </div>
            </SubMenu>

            {/* Categories filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <AppstoreOutlined className='align-bottom pb-3' /> Categories
                </span>
              }
              key={2}
            >
              {categories.map(category => (
                <div key={category._id}>
                  <Checkbox
                    value={category._id}
                    name='category'
                    onChange={handleCheck}
                    checked={categoryIds.includes(category._id)}
                  >
                    {category.name}
                  </Checkbox>
                  <br />
                </div>
              ))}
            </SubMenu>

            {/* Subcategories filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <ApartmentOutlined className='align-bottom pb-3' />{' '}
                  Subcategories
                </span>
              }
              key={4}
            >
              {subcategories.map(subcategory => (
                <div
                  key={subcategory._id}
                  onClick={() => handleSubcategory(subcategory)}
                  className='p-1 m-1 badge badge-secondary'
                  style={{ cursor: 'pointer' }}
                >
                  {subcategory.name}
                </div>
                // <br />
              ))}
            </SubMenu>

            {/* Brand filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <SketchOutlined className='align-bottom pb-3' /> Brands
                </span>
              }
              key={5}
            >
              {brands.map(brand => (
                <div key={brand}>
                  <Radio
                    value={brand}
                    name={brand}
                    checked={brand === selectedBrand}
                    onChange={handleBrand}
                    className='pb-1 pl-1 pr-4'
                  >
                    {brand}
                  </Radio>
                  <br />
                </div>
              ))}
            </SubMenu>

            {/* Color filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <BgColorsOutlined className='align-bottom pb-3' /> Color
                </span>
              }
              key={6}
            >
              {colors.map(color => (
                <div key={color}>
                  <Radio
                    value={color}
                    name={color}
                    checked={color === selectedColor}
                    onChange={handleColor}
                    className='pb-1 pl-1 pr-4'
                  >
                    {color}
                  </Radio>
                  <br />
                </div>
              ))}
            </SubMenu>

            {/* Shipping filter */}
            <SubMenu
              title={
                <span className='h5'>
                  <DropboxOutlined className='align-bottom pb-3' /> Locker
                  shipping
                </span>
              }
              key={7}
            >
              <>
                <Checkbox
                  value='Yes'
                  checked={shipping === 'Yes'}
                  onChange={handleShipping}
                  className='pb-1 pl-1 pr-4'
                >
                  Yes
                </Checkbox>
                <Checkbox
                  value='No'
                  checked={shipping === 'No'}
                  onChange={handleShipping}
                  className='pb-1 pl-1 pr-4'
                >
                  No
                </Checkbox>
              </>
            </SubMenu>
          </Menu>
        </div>

        {/* Products */}
        <div className='col-md-9 pt-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}
          <hr />
          {products.length < 1 && <p>No products found</p>}

          <div className='row pb-5'>
            {products.map(product => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
