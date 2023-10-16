import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory, updateCategory } from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))
  const { slug } = useParams()
  const navigate = useNavigate()

  // Load the category we want to edit when component mounts
  useEffect(() => {
    loadCategory()
  }, [])

  // Get category from backend based on slug
  const loadCategory = () =>
    getCategory(slug).then(res => setName(res.data.name))

  // Add a new category
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Use the create category method to create one in database
    updateCategory(slug, { name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(
          `The '${slug}' category has been updated to '${res.data.name}'`
        )
        navigate('/admin/category')
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
          <br />
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <hr />
          
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
