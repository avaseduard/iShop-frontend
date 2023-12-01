import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setSearch } from '../store/reducers/search.reducer'
import { listAllColors } from '../functions/color'
import { listAllBrands } from '../functions/brand'
import { fetchProductsbyFilter, getProductsByCount } from '../functions/product'
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

const Shop = () => {
  // const dispatch = useDispatch()
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [price, setPrice] = useState([0, 9999])
  const [star, setStar] = useState(null)
  const [subcategories, setSubcategories] = useState([])
  const [subcategory, setSubcategory] = useState('')
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [colors, setColors] = useState([])
  const [selectedColor, setSelectedColor] = useState('')
  const [shipping, setShipping] = useState('')

  // Object to hold all filters
  const [filters, setFilters] = useState({
    query: '',
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

  // Load filter option when the page loads
  useEffect(() => {
    loadCategories()
    loadSubcategories()
    loadColors()
    loadBrands()
  }, [])
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
  //
  const loadColors = () => {
    setLoading(true)
    listAllColors().then(res => {
      setLoading(false)
      setColors(res.data)
    })
  }
  //
  const loadBrands = () => {
    setLoading(true)
    listAllBrands().then(res => {
      setLoading(false)
      setBrands(res.data)
    })
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
  // Modify slider position in real time
  const handleSlider = (event, value) => {
    setPrice(value)
  }

  // Load products based on rating
  const handleStar = (event, newValue) => {
    setStar(newValue)
    setFilters({ ...filters, stars: newValue })
  }

  // Load categories based on checkbox filter
  const handleCheck = e => {
    const inTheState = [...categoryIds]
    const justChecked = e.target.value
    const foundInTheState = inTheState.indexOf(justChecked) // index or -1
    // If the category id isn't found in the state, add it, if it's found, remove it
    foundInTheState === -1
      ? inTheState.push(justChecked)
      : inTheState.splice(foundInTheState, 1)
    // Set category ids to state, for checkbox functionality
    setCategoryIds(inTheState)
    setFilters({ ...filters, category: inTheState })
  }

  // Load products based on subcategory
  const handleSubcategory = subcat => {
    setSubcategory(subcat)
    setFilters({ ...filters, subcategory: subcat })
  }

  // Load products based on brand
  const handleBrand = e => {
    setSelectedBrand(e.target.value)
    setFilters({ ...filters, brand: e.target.value })
  }

  // Load products based on color
  const handleColor = e => {
    setSelectedColor(e.target.value)
    setFilters({ ...filters, color: e.target.value })
  }

  // Load products based on shipping
  const handleShipping = e => {
    setShipping(e.target.value)
    setFilters({ ...filters, shipping: e.target.value })
  }

  // Reset all filters
  const resetAllFilters = () => {
    // loadAllProducts()
    // dispatch(setSearch(''))
    // setPrice([0, 9999])
    // setCategoryIds([])
    // setStar(null)
    // setSubcategory('')
    // setSelectedBrand('')
    // setSelectedColor('')
    // setShipping('')
    // setFilters({
    //   query: '',
    //   price: [0, 9999],
    //   stars: null,
    //   category: [],
    //   subcategory: '',
    //   brand: '',
    //   color: '',
    //   shipping: '',
    // })
  }

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
      label: 'Price $',
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
          label: <FilterStar star={star} handleStar={handleStar} />,
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
                value={category._id}
                name='category'
                onChange={handleCheck}
                checked={categoryIds.includes(category._id)}
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
              checked={brand.name === selectedBrand}
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
                checked={color.name === selectedColor}
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
              <Checkbox value='Yes' onChange={handleShipping}>
                Yes
              </Checkbox>
              <Checkbox value='No' onChange={handleShipping}>
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
