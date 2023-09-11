import Jumbotron from '../components/cards/Jumbotron'
import CategoryList from '../components/category/CategoryList'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'
import SubcategoryList from '../components/subcategory/SubcategoryList'

const Home = () => (
  <>
    <div className='jumbotron h1 text-center text-danger font-weight-bold'>
      <Jumbotron text={['New arrivals', 'Best sellers', 'Special offers']} />
    </div>

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      New arrivals
    </h4>
    <NewArrivals />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      Best sellers
    </h4>
    <BestSellers />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      Categories
    </h4>
    <CategoryList />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      Subcategories
    </h4>
    <SubcategoryList />
  </>
)

export default Home
