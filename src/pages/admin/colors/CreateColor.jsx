import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LocalSearch from '../../../components/forms/LocalSearch'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import { createColor, listAllColors, removeColor } from '../../../functions/color'
import { toast } from 'react-toastify'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const ColorsCreate = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [colors, setColors] = useState([])
  const [keyword, setKeyword] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadColors()
  }, [])

  const loadColors = () => {
    setLoading(true)
    listAllColors()
      .then(res => {
        setLoading(false)
        setColors(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log('GET COLORS FAILED IN BE -->', error)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createColor({ name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" color has been created`)
        loadColors()
      })
      .catch(error => {
        setLoading(false)
        console.log('COLOR CREATE FAILED IN FE -->', error)
      })
  }

  // Delete a color
  const handleRemove = async slug => {
    // Prompt admin for confirmation
    if (window.confirm(`Are you sure you want to delete the '${slug}' color`)) {
      setLoading(true)
      // Use remove color method to remove one from database
      removeColor(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success(`The '${res.data.name}' color successfully removed`)
          loadColors()
        })
        .catch(error => {
          setLoading(false)
          console.log('COLOR REMOVE FAILED IN FE -->', error)
        })
    }
  }

  const searched = keyword => color =>
    color.name.toLowerCase().includes(keyword)

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
            <h4>Create colors</h4>
          )}
          <hr />

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {colors.filter(searched(keyword)).map(color => (
            <div key={color._id} className='alert alert-secondary'>
              {color.name}{' '}
              <span
                onClick={() => handleRemove(color.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/color/${color.slug}`}>
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

export default ColorsCreate
