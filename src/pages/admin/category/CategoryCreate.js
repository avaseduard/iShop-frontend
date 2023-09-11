import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [keyword, setKeyword] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  // Load categories when component mounts
  useEffect(() => {
    loadCategories()
  }, [])

  // Get categories from backend
  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data))

  // Add a new category
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Use the create category method to create one in database
    createCategory({ name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" category has been created`)
        loadCategories()
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

  // Delete a category
  const handleRemove = async slug => {
    // Prompt admin for confirmation
    if (window.confirm(`Are you sure you want to delete ${slug} category`)) {
      setLoading(true)
      // Use remobve category method to remove one form database
      removeCategory(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success(`${res.data.name} category successfully removed`)
          loadCategories()
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          if (err.response.status === 400) {
            toast.error(err.response.data)
          }
        })
    }
  }

  //
  const searched = keyword => category =>
    category.name.toLowerCase().includes(keyword)

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {categories.filter(searched(keyword)).map(category => (
            <div key={category._id} className='alert alert-secondary'>
              {category.name}{' '}
              <span
                onClick={() => handleRemove(category.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate
