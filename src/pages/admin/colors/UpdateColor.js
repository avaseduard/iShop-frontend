import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { useNavigate, useParams } from 'react-router-dom'
import { colorUpdate, getColor } from '../../../functions/color'
import { toast } from 'react-toastify'

const UpdateColor = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const { slug } = useParams()
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadColor()
  }, [])

  const loadColor = () => getColor(slug).then(res => setName(res.data.name))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    colorUpdate(slug, { name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(
          `The '${slug}' color has been updated to '${res.data.name}'`
        )
        navigate('/admin/colors')
      })
      .catch(error => {
        setLoading(false)
        console.log('COLOR UPDATE FAILED IN FE -->', error)
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
            <h4>Update color</h4>
          )}
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

export default UpdateColor
