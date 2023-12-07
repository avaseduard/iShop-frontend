import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../functions/category'
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = () => {
  const { slug } = useParams()
  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCategory(slug).then(res => {
      setCategory(res.data.category)
      setProducts(res.data.products)
      setLoading(false)
    })
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='column'>
          {loading ? (
            <h4 className='jumbotron text-center display-4 p-3 mt-5 mb-5'>
              Loading...
            </h4>
          ) : (
            <h4 className='jumbotron text-center display-4 p-3 mt-5 mb-5'>
              {products.length} products in '{category.name}' category
            </h4>
          )}
        </div>
      </div>

      <div className='row'>
        {products.map(product => (
          <div key={product._id} className='col-md-4'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryHome
