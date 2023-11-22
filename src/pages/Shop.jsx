import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../store/reducers/search.reducer'
import { listAllColors } from '../functions/color'
import { listAllBrands } from '../functions/brand'
import { fetchProductsbyFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubcategories } from '../functions/subcategory'
import ProductCard from '../components/cards/ProductCard'
import FilterStar from '../components/forms/FilterStar'
import { Checkbox, Menu, Radio, Slider } from 'antd'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  DollarOutlined,
  DropboxOutlined,
  SketchOutlined,
  StarOutlined,
} from '@ant-design/icons'

const Shop = () => {
  const dispatch = useDispatch()
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

  // Filter method adapted to each filter/ query
  const fetchProducts = argument => {
    setLoading(true)
    fetchProductsbyFilter(argument).then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  // Load products and filter values when page loads
  useEffect(() => {
    loadAllProducts()
    loadCategories()
    loadSubcategories()
    loadColors()
    loadBrands()
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
    // setCategoryIds([])
    setPrice(value)
  }

  // Load categories based on checkbox filter
  const handleCheck = e => {
    dispatch(setSearch(''))
    const inTheState = [...categoryIds]
    const justChecked = e.target.value
    const foundInTheState = inTheState.indexOf(justChecked) // index or -1
    // If the category id isn't found in the state, add it, if it's found, remove it
    foundInTheState === -1
      ? inTheState.push(justChecked)
      : inTheState.splice(foundInTheState, 1)
    // Set category ids to state, for checkbox functionality
    setCategoryIds(inTheState)
    // When the user deselects all checkboxes, reset filter
    !inTheState.length
      ? loadAllProducts()
      : fetchProducts({ category: inTheState })
  }

  // Load products based on rating
  const handleStar = (event, newValue) => {
    dispatch(setSearch(''))
    setStar(newValue)
    // If user clicks on star, filter and if he clicks again, reset filter
    !newValue ? loadAllProducts() : fetchProducts({ stars: newValue })
  }

  // Load products based on subcategory
  const handleSubcategory = subcat => {
    dispatch(setSearch(''))
    setSubcategory(subcat)
    // If user clicks on subcategory, filter and if he clicks again, reset filter
    subcategory === subcat
      ? loadAllProducts()
      : fetchProducts({ subcategory: subcat })
  }

  // Load products based on brand
  const handleBrand = e => {
    dispatch(setSearch(''))
    setSelectedBrand(e.target.value)
    fetchProducts({ brand: e.target.value })
    console.log(e.target.value)
    // console.log(selectedBrand)
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
    // If checkbox is checked, fetched products based on value, else do not filter
    e.target.checked
      ? fetchProducts({ shipping: e.target.value })
      : loadAllProducts()
  }

  const menuItems = [
    // Price filter
    {
      // label: 'Price $',
      label: 'Price $',
      key: '1',
      icon: <DollarOutlined />,
      children: [
        {
          type: 'group',
          label: (
            <Slider
              range
              value={price}
              onChange={handleSlider}
              max='9999'
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
                // checked={categoryIds.includes(category._id)}
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
              <Checkbox
                value='Yes'
                onChange={handleShipping}
              >
                Yes
              </Checkbox>
              <Checkbox
                value='No'
                onChange={handleShipping}
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
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
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
