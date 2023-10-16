import Jumbotron from '../components/cards/Jumbotron'
import CategoryList from '../components/category/CategoryList'
import BestSellers from '../components/home/BestSellers'
import HomeCarousel from '../components/home/HomeCarousel'
import NewArrivals from '../components/home/NewArrivals'
import SubcategoryList from '../components/subcategory/SubcategoryList'
import {
  FieldTimeOutlined,
  FireOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'

const Home = () => (
  <>
    <HomeCarousel />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      <FieldTimeOutlined className='align-top pt-2' /> New arrivals
    </h4>
    <NewArrivals />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      <FireOutlined className='align-top pt-2' /> Best sellers
    </h4>
    <BestSellers />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      <AppstoreOutlined className='align-top pt-2' /> Categories
    </h4>
    <CategoryList />

    <h4 className='jumbotron text-center p-3 mt-5 mb-5 display-4'>
      <ApartmentOutlined className='align-top pt-2' /> Subcategories
    </h4>
    <SubcategoryList />
  </>
)

export default Home
