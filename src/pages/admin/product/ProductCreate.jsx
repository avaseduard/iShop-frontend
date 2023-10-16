import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createProduct } from '../../../functions/product'
import { useNavigate } from 'react-router-dom'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {
  getCategories,
  getSubcategoriesByCategoryId,
} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import { listAllColors } from '../../../functions/color'

// Initial keys and values of product state
const intitialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subcategories: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: [],
  color: '',
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  brand: '',
}

const ProductCreate = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => ({ ...state }))
  const [values, setValues] = useState(intitialState)
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [loading, setLoading] = useState(false)

  // When page loads, populate categories for dropdown
  useEffect(() => {
    loadColors()
    loadCategories()
  }, [])

  // Get the available colors from backend and set them in state
  const loadColors = () => {
    setLoading(true)
    listAllColors()
      .then(res => {
        setLoading(false)
        setValues(values => ({
          ...values,
          colors: res.data,
        }))
      })
      .catch(error => {
        setLoading(false)
        console.log('LIST ALL COLORS FAILED IN FE -->', error)
      })
  }

  // Get the categories from backend and set them in state
  const loadCategories = () => {
    setLoading(true)
    getCategories()
      .then(categories => {
        setLoading(false)
        setValues(values => ({ ...values, categories: categories.data }))
      })
      .catch(error => {
        setLoading(false)
        console.log('CATEGORIES LOADING FAILED IN FE -->', error)
      })
  }

  // When the admin selects a category, send the id to backend, return the subcategories and populate the dropdown
  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({ ...values, subcategories: [], category: e.target.value })
    getSubcategoriesByCategoryId(e.target.value).then(res => {
      setSubcategoryOptions(res.data)
    })
    setShowSubcategories(true)
  }

  // Dinamically take each key and value that the admin selects and set it to product state
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Create product in database using the values input by admin
  const handleSubmit = e => {
    e.preventDefault()
    createProduct(values, user.user.token)
      .then(res => {
        toast.success(`'${res.data.title}' product has been created`)
        navigate('/admin/products')
      })
      .catch(error => {
        console.log('CREATE PRODUCT FAILED IN FE -->', error)
        // Show the error message that we're sending from backend
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
            <h4>Create product</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subcategoryOptions={subcategoryOptions}
            showSubcategories={showSubcategories}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
