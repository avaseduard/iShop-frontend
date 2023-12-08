import { useEffect, useState } from 'react'
import { getProducts, getProductsCount } from '../../functions/product'
import LoadingCard from '../cards/LoadingCard'
import ProductCard from '../cards/ProductCard'
import { Pagination } from 'antd'

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 3

  useEffect(() => {
    loadAllProducts()
  }, [page])

  useEffect(() => {
    getProductsCount().then(res => setProductsCount(res.data))
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProducts('sold', 'desc', page)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log('LOADING BEST SELLERS FAILED -->', error)
      })
  }

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard limit={limit} />
        ) : (
          <div className='row'>
            {products.map(product => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center p-3'>
          <Pagination
            current={page}
            pageSize={3}
            total={productsCount}
            onChange={value => setPage(value)}
          />
        </nav>
      </div>
    </>
  )
}

export default BestSellers
