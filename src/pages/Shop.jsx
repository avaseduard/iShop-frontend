import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAllColors } from '../functions/color'
import { listAllBrands } from '../functions/brand'
import { fetchProductsbyFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubcategories } from '../functions/subcategory'
import ProductCard from '../components/cards/ProductCard'
import FilterStar from '../components/forms/FilterStar'
import { Checkbox, Menu, Radio, Button } from 'antd'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  CloseSquareOutlined,
  DollarOutlined,
  DropboxOutlined,
  SketchOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Slider } from '@mui/material'
import { setSearch } from '../store/reducers/search.reducer'

const Shop = () => {
  const dispatch = useDispatch()
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState([0, 9999])
  const [subcategories, setSubcategories] = useState([])
  const [brands, setBrands] = useState([])
  const [colors, setColors] = useState([])

  // Object to hold all filters
  const [filters, setFilters] = useState({
    query: text,
    price: [0, 9999],
    stars: null,
    category: '',
    subcategory: '',
    brand: '',
    color: '',
    shipping: '',
  })

  // Watch for changes in the filters state and fetch whenever filters change
  useEffect(() => {
    fetchProducts(filters)
  }, [filters])

  // Fetch products with combined filters
  const fetchProducts = async filters => {
    setLoading(true)
    try {
      const res = await fetchProductsbyFilter(filters)
      setProducts(res.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load filter options when page loads
  useEffect(() => {
    initializeFilters()
  }, [])
  //
  const initializeFilters = async () => {
    try {
      setLoading(true)
      // Categories filter values
      const categoriesResponse = await getCategories()
      setCategories(categoriesResponse.data)
      // Subcategories filter values
      const subcategoriesResponse = await getSubcategories()
      setSubcategories(subcategoriesResponse.data)
      // Colors filter values
      const colorsResponse = await listAllColors()
      setColors(colorsResponse.data)
      // Brands filter values
      const brandsResponse = await listAllBrands()
      setBrands(brandsResponse.data)
    } catch (error) {
      console.error('Error initializing filters:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load products based on user search input with a delay of 300 ms
  useEffect(() => {
    const delayed = setTimeout(() => {
      setFilters({ ...filters, query: text })
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  // Load products based on price slider input with a delay of 300 ms
  useEffect(() => {
    const delayed = setTimeout(() => {
      setFilters({ ...filters, price: price })
    }, 300)
    return () => clearTimeout(delayed)
  }, [price])
  // Show slider position in real time
  const handleSlider = (event, value) => setPrice(value)

  // Load products based on rating
  const handleStar = (event, newValue) =>
    setFilters({ ...filters, stars: newValue })

  // Load products based on subcategory
  const handleSubcategory = subcat =>
    setFilters({ ...filters, subcategory: subcat })

  // Load products based on brand
  const handleBrand = e => setFilters({ ...filters, brand: e.target.value })

  // Load products based on color
  const handleColor = e => setFilters({ ...filters, color: e.target.value })

  // Load products based on shipping and/ or categories
  const handleCheckboxes = (filterKey, event) => {
    const { checked, value } = event.target
    const inTheState = [...filters[filterKey]]
    // When the user checks a filter, push it to array, when he unchecks, delete from array
    checked
      ? inTheState.push(value)
      : inTheState.splice(inTheState.indexOf(value), 1)
    // Set the filter to filter state and if the array becomes empty, set empty string
    setFilters({
      ...filters,
      [filterKey]: inTheState.length === 0 ? '' : inTheState,
    })
  }

  // Reset all filters functionality
  const resetAllFilters = () => {
    setFilters({
      query: '',
      price: [0, 9999],
      stars: null,
      category: '',
      subcategory: '',
      brand: '',
      color: '',
      shipping: '',
    })
    dispatch(setSearch(''))
  }

  // Ant design menu items
  const menuItems = [
    // Reset filters button
    {
      label: 'Reset all filters',
      key: '0',
      icon: <CloseSquareOutlined />,
      children: [
        {
          type: 'group',
          label: <Button onClick={resetAllFilters}>Reset filters</Button>,
        },
      ],
    },
    // Price filter
    {
      label: 'Price €',
      key: '1',
      icon: <DollarOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <Slider
              value={price}
              onChange={handleSlider}
              valueLabelDisplay='auto'
              max={9999}
            />
          ),
        },
      ],
    },
    // Rating filter
    {
      label: 'Rating',
      key: '2',
      icon: <StarOutlined />,
      children: [
        {
          type: 'group',
          label: <FilterStar star={filters.stars} handleStar={handleStar} />,
        },
      ],
    },
    // Categories filter
    {
      label: 'Categories',
      key: '3',
      icon: <AppstoreOutlined />,
      children: [
        {
          type: 'group',
          label: categories.map(category => (
            <div key={category._id}>
              <Checkbox
                // checked
                value={category._id}
                name='category'
                onChange={e => handleCheckboxes('category', e)}
                checked={filters.category.includes(category._id)}
              >
                {category.name}
              </Checkbox>
            </div>
          )),
        },
      ],
    },
    // Subcategories filter
    {
      label: 'Subcategories',
      key: '4',
      icon: <ApartmentOutlined />,
      children: [
        {
          type: 'group',
          label: subcategories.map(subcategory => (
            <div
              key={subcategory._id}
              onClick={() => handleSubcategory(subcategory)}
              className='p-1 m-1 badge badge-secondary'
              style={{ cursor: 'pointer' }}
            >
              {subcategory.name}
            </div>
          )),
        },
      ],
    },
    // Brand filter
    {
      label: 'Brands',
      key: '5',
      icon: <SketchOutlined />,
      children: [
        {
          type: 'group',
          label: brands.map(brand => (
            <Radio
              key={brand._id}
              value={brand.name}
              name={brand.name}
              checked={brand.name === filters.brand}
              onChange={handleBrand}
            >
              {brand.name}
            </Radio>
          )),
        },
      ],
    },
    // Color filter
    {
      label: 'Color',
      key: '6',
      icon: <BgColorsOutlined />,
      children: [
        {
          type: 'group',
          label: colors.map(color => (
            <div key={color._id}>
              <Radio
                value={color.name}
                name={color.name}
                checked={color.name === filters.color}
                onChange={handleColor}
              >
                {color.name}
              </Radio>
            </div>
          )),
        },
      ],
    },
    // Locker shipping filter
    {
      label: 'Locker shipping',
      key: '7',
      icon: <DropboxOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <div>
              <Checkbox
                value='Yes'
                onChange={e => handleCheckboxes('shipping', e)}
              >
                Yes
              </Checkbox>
              <Checkbox
                value='No'
                onChange={e => handleCheckboxes('shipping', e)}
              >
                No
              </Checkbox>
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-3'>
          {/* Filters */}
          <h4>Filter</h4>
          <hr />
          <Menu
            items={menuItems}
            mode='inline'
            defaultOpenKeys={['0', '1', '2', '3', '4', '5', '6', '7']}
          />
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
