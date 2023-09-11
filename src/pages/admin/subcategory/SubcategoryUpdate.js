import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'
import {
  getSubcategory,
  updateSubcategory,
} from '../../../functions/subcategory'

const SubcategoryUpdate = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parentId, setParentId] = useState('')
  const { slug } = useParams()
  const { user } = useSelector(state => ({ ...state }))

  // Load categories when component mounts
  useEffect(() => {
    loadCategories()
    loadSubcategory()
  }, [])

  // Get categories from backend
  const loadCategories = () =>
    getCategories().then(category => setCategories(category.data))

  // Get subcategories from backend
  const loadSubcategory = () =>
    getSubcategory(slug).then(subcategory => {
      setName(subcategory.data.name)
      setParentId(subcategory.data.parent)
    })

  // Add a new subcategory
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Use the create category method to create one in database
    updateSubcategory(slug, { name: name, parent: parentId }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" category has been updated`)
        navigate('/admin/subcategory')
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

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
            <h4>Create subcategory</h4>
          )}

          <div className='form-group'>
            <label>Select parent category</label>
            <select
              name='category'
              onChange={e => setParentId(e.target.value)}
              className='form-control'
              value={parentId}
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
        </div>
      </div>
    </div>
  )
}

export default SubcategoryUpdate
