import { useEffect, useState } from 'react'
import { getSubcategories } from '../../functions/subcategory'
import { Link } from 'react-router-dom'

const SubcategoryList = () => {
  const [loading, setLoading] = useState(false)
  const [subcategories, setSubcategories] = useState([])

  useEffect(() => {
    setLoading(true)
    getSubcategories().then(res => {
      setSubcategories(res.data)
      setLoading(false)
    })
  }, [])

  const showSubcategories = () =>
    subcategories.map(subcategory => (
      <div
        key={subcategory._id}
        className='col btn btn-outline-info btn-lg btn-block btn-raised m-3'
      >
        <Link to={`/subcategory/${subcategory.slug}`}>{subcategory.name}</Link>
      </div>
    ))

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : (
          showSubcategories()
        )}
      </div>
    </div>
  )
}

export default SubcategoryList
