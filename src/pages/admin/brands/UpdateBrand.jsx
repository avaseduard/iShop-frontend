import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { brandUpdate, getBrand } from '../../../functions/brand'

const UpdateBrand = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const { slug } = useParams()
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadBrand()
  }, [])

  const loadBrand = () => getBrand(slug).then(res => setName(res.data.name))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    brandUpdate(slug, { name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(
          `The '${slug}' brand has been updated to '${res.data.name}'`
        )
        navigate('/admin/brands')
      })
      .catch(error => {
        setLoading(false)
        console.log('BRAND UPDATE FAILED IN FE -->', error)
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
            <h4>Update brand</h4>
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

export default UpdateBrand
