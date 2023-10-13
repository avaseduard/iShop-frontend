import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LocalSearch from '../../../components/forms/LocalSearch'
import CategoryForm from '../../../components/forms/CategoryForm'
import {
  createColor,
  listAllColors,
  removeColor,
} from '../../../functions/color'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import UserNav from '../../../components/nav/UserNav'
import {
  createAddress,
  listAllAddresses,
  removeAddress,
} from '../../../functions/address'

const CreateAddress = () => {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [addresses, setAddresses] = useState([])
  const [keyword, setKeyword] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadAddresses()
  }, [])

  const loadAddresses = () => {
    setLoading(true)
    listAllAddresses(user.user.token)
      .then(res => {
        setLoading(false)
        setAddresses(res.data[0].addresses)
      })
      .catch(error => {
        setLoading(false)
        console.log('GET ADDRESSES FAILED IN FE -->', error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createAddress(address, user.user.token)
      .then(res => {
        setLoading(false)
        setAddress('')
        toast.success('Delivery address has been added')
        loadAddresses()
      })
      .catch(error => {
        setLoading(false)
        console.log('ADDRESS CREATE FAILED IN FE -->', error)
      })
  }

  // Delete a color
  const handleRemove = async slug => {
    // Prompt admin for confirmation
    if (window.confirm('Are you sure you want to delete this address')) {
      setLoading(true)
      // Use remove method to remove one from database
      removeAddress(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success('The address has been successfully removed')
          loadAddresses()
        })
        .catch(error => {
          setLoading(false)
          console.log('COLOR REMOVE FAILED IN FE -->', error)
        })
    }
  }

  const searched = keyword => address =>
    address.location.toLowerCase().includes(keyword)

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
            <h4>Create delivery locations</h4>
          )}
          <hr />
          <CategoryForm
            handleSubmit={handleSubmit}
            name={address}
            setName={setAddress}
          />
          <br />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {addresses.filter(searched(keyword)).map(address => (
            <div key={address._id} className='alert alert-secondary'>
              {address.location}{' '}
              <span
                onClick={() => handleRemove(address.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/user/address/${address.slug}`}>
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

export default CreateAddress
