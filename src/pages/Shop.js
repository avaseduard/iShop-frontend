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
              // defaultValue={[0, 9999]}
              max='9999'
              // className='ml-1 mr-1'
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
          label: <Star starClick={handleStarClick} numberOfStars={5} />,
        },
        {
          type: 'group',
          label: <Star starClick={handleStarClick} numberOfStars={4} />,
        },
        {
          type: 'group',
          label: <Star starClick={handleStarClick} numberOfStars={3} />,
        },
        {
          type: 'group',
          label: <Star starClick={handleStarClick} numberOfStars={2} />,
        },
        {
          type: 'group',
          label: <Star starClick={handleStarClick} numberOfStars={1} />,
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
              key={brand}
              value={brand}
              name={brand}
              checked={brand === selectedBrand}
              onChange={handleBrand}
              // className='pb-1 pl-1 pr-4'
            >
              {brand}
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
            <div key={color}>
              <Radio
                value={color}
                name={color}
                checked={color === selectedColor}
                onChange={handleColor}
                // className='pb-1 pl-1 pr-4'
              >
                {color}
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
                checked={shipping === 'Yes'}
                onChange={handleShipping}
                // className='pb-1 pl-1 pr-4'
              >
                Yes
              </Checkbox>
              <Checkbox
                value='No'
                checked={shipping === 'No'}
                onChange={handleShipping}
                // className='pb-1 pl-1 pr-4'
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
