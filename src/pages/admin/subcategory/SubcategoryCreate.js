import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
  getCategories,
} from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import {
  createSubcategory,
  getSubcategories,
  removeSubcategory,
} from '../../../functions/subcategory'

const SubcategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [keyword, setKeyword] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  // Load categories when component mounts
  useEffect(() => {
    loadCategories()
    loadSubcategories()
  }, [])

  // Get categories from backend
  const loadCategories = () =>
    getCategories().then(category => setCategories(category.data))

  // Get subcategories from backend
  const loadSubcategories = () =>
    getSubcategories().then(subcategory => setSubcategories(subcategory.data))

  // Add a new subcategory
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Use the create category method to create one in database
    createSubcategory({ name: name, parent: categoryId }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" category has been created`)
        loadSubcategories()
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
    if (window.confirm(`Are you sure you want to delete ${slug} subcategory`)) {
      setLoading(true)
      // Use remobve category method to remove one form database
      removeSubcategory(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success(`${res.data.name} subcategory successfully removed`)
          loadSubcategories()
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
          <br />
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create subcategory</h4>
          )}
          <hr />

          <div className='form-group'>
            <label>Select parent category</label>
            <select
              name='category'
              onChange={e => setCategoryId(e.target.value)}
              className='form-control'
            >
              <option>Please select...</option>
              {categories.length > 0 &&
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subcategories.filter(searched(keyword)).map(subcategory => (
            <div key={subcategory._id} className='alert alert-secondary'>
              {subcategory.name}{' '}
              <span
                onClick={() => handleRemove(subcategory.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/subcategory/${subcategory.slug}`}>
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

export default SubcategoryCreate
