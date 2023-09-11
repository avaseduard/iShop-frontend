import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSubcategory } from '../../functions/subcategory'
import ProductCard from '../../components/cards/ProductCard'

const SubcategoryHome = () => {
  const { slug } = useParams()
  const [subcategory, setSubcategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSubcategory(slug).then(res => {
      setSubcategory(res.data.subcategory)
      setProducts(res.data.products)
      // console.log(res.data)
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
              {products.length} products in '{subcategory.name}' subcategory
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

export default SubcategoryHome
