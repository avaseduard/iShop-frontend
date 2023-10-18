import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LocalSearch from '../../../components/forms/LocalSearch'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { createBrand, listAllBrands, removeBrand } from '../../../functions/brand'

const CreateBrand = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [brands, setBrands] = useState([])
  const [keyword, setKeyword] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = () => {
    setLoading(true)
    listAllBrands()
      .then(res => {
        setLoading(false)
        setBrands(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log('GET BRANDS FAILED IN BE -->', error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createBrand({ name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`'${res.data.name}' brand has been created`)
        loadBrands()
      })
      .catch(error => {
        setLoading(false)
        console.log('BRAND CREATE FAILED IN FE -->', error)
      })
  }

  // Delete a color
  const handleRemove = async slug => {
    // Prompt admin for confirmation
    if (window.confirm(`Are you sure you want to delete the '${slug}' brand`)) {
      setLoading(true)
      // Use remove color method to remove one from database
      removeBrand(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success(`The '${res.data.name}' brand successfully removed`)
          loadBrands()
        })
        .catch(error => {
          setLoading(false)
          console.log('BRAND REMOVE FAILED IN FE -->', error)
        })
    }
  }

  const searched = keyword => brand =>
    brand.name.toLowerCase().includes(keyword)

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
            <h4>Create brands</h4>
          )}
          <hr />

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {brands.filter(searched(keyword)).map(brand => (
            <div key={brand._id} className='alert alert-secondary'>
              {brand.name}{' '}
              <span
                onClick={() => handleRemove(brand.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/brand/${brand.slug}`}>
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

export default CreateBrand
