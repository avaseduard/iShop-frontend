import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { useNavigate, useParams } from 'react-router-dom'
import { colorUpdate, getColor } from '../../../functions/color'
import { toast } from 'react-toastify'
import UserNav from '../../../components/nav/UserNav'
import { addressUpdate, getAddress } from '../../../functions/address'

const UpdateAddress = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const { slug } = useParams()
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadAddress()
  }, [])

  const loadAddress = () =>
    getAddress(slug, user.user.token).then(res => {
      console.log(res.data[0].addresses[0])
      setName(res.data[0].addresses[0].location)
    })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    addressUpdate(slug, { name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success('The address has been updated successfuly')
        navigate('/user/addresses')
      })
      .catch(error => {
        setLoading(false)
        console.log('ADDRESS UPDATE FAILED IN FE -->', error)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <br />
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update address</h4>
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

export default UpdateAddress
