import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  createProduct,
  getProductBySlug,
  updateProduct,
} from '../../../functions/product'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getCategories,
  getSubcategoriesByCategoryId,
} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import { listAllColors } from '../../../functions/color'
import { listAllBrands } from '../../../functions/brand'

// Initial keys and values of product state
const intitialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subcategories: [],
  shipping: '',
  quantity: '',
  images: [],
  color: '',
  brand: '',
}

const ProductUpdate = () => {
  const { slug } = useParams()
  const [values, setValues] = useState(intitialState)
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [colors, setColors] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [arrayOfSubcategoriesIds, setArrayOfSubcategoriesIds] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))
  const navigate = useNavigate()

  // Populate the form with product info from db
  useEffect(() => {
    loadProduct()
    loadCategories()
    loadColors()
    loadBrands()
  }, [])

  // Get the product from backend and set it to state
  const loadProduct = () => {
    getProductBySlug(slug).then(product => {
      // Load single product and set in state
      setValues({ ...values, ...product.data })
      // Load single product category subcatgeories
      getSubcategoriesByCategoryId(product.data.category._id).then(res =>
        setSubcategoryOptions(res.data)
      )
      // Create array with product's subcategory ids to show in form
      let arr = []
      product.data.subcategories.map(subcategory => {
        arr.push(subcategory._id)
        setArrayOfSubcategoriesIds(arr)
      })
    })
  }

  // Get the categories from backend and set them in their own state
  const loadCategories = () =>
    getCategories().then(categories => setCategories(categories.data))

  // Get the available colors from backend and set them in state
  const loadColors = () => {
    setLoading(true)
    listAllColors()
      .then(res => {
        setLoading(false)
        setColors(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log('LIST ALL COLORS FAILED IN FE -->', error)
      })
  }

  // Get the available colors from backend and set them in state
  const loadBrands = () => {
    setLoading(true)
    listAllBrands()
      .then(res => {
        setLoading(false)
        setBrands(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log('LIST ALL BRANDS FAILED IN FE -->', error)
      })
  }

  // Dinamically take each key and value that the admin selects and set it to product state
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // When the admin selects a category, send the id to backend, return the subcategories and populate the dropdown
  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({ ...values, subcategories: [] })
    //
    setSelectedCategory(e.target.value)
    //
    getSubcategoriesByCategoryId(e.target.value).then(res => {
      setSubcategoryOptions(res.data)
    })
    // When initial category is selected, show the corresponding subs
    if (values.category._id === e.target.value) loadProduct()
    // When category is changed, show the appropriate subs
    setArrayOfSubcategoriesIds([])
  }

  // Create product in database using the values input by admin
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    values.subcategories = arrayOfSubcategoriesIds
    // Update category in product state only if the user changed it
    values.category = selectedCategory ? selectedCategory : values.category
    // Update the product in database
    updateProduct(slug, values, user.user.token)
      .then(res => {
        setLoading(false)
        toast.success(`'${res.data.title}' has been updated`)
        navigate('/admin/products')
      })
      .catch(error => {
        setLoading(false)
        console.log('PRODUCT UPDATE FAILED -->', error)
        toast.error(error.response.data.error)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <br />
          {loading ? (
            <LoadingOutlined className='h1 text-danger' />
          ) : (
            <h4>Update product</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            colors={colors}
            brands={brands}
            subcategoryOptions={subcategoryOptions}
            setArrayOfSubcategoriesIds={setArrayOfSubcategoriesIds}
            arrayOfSubcategoriesIds={arrayOfSubcategoriesIds}
            selectedCategory={selectedCategory}
          />
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ProductUpdate
