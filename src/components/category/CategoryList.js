import { useEffect, useState } from 'react'
import { getCategories } from '../../functions/category'
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setLoading(true)
    getCategories().then(res => {
      setCategories(res.data)
      setLoading(false)
    })
  }, [])

  const showCategories = () =>
    categories.map(category => (
      <div
        key={category._id}
        className='col btn btn-outline-info btn-lg btn-block btn-raised m-3'
      >
        <Link to={`/category/${category.slug}`}>{category.name}</Link>
      </div>
    ))

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  )
}

export default CategoryList
