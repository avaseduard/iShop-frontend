import { useEffect, lazy, Suspense } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { currentUser } from './functions/auth'
import { setUser } from './store/reducers/user.reducer'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingOutlined } from '@ant-design/icons'

const Header = lazy(() => import('./components/nav/Header'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const History = lazy(() => import('./pages/user/History'))
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
)
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
)
const SubcategoryCreate = lazy(() =>
  import('./pages/admin/subcategory/SubcategoryCreate')
)
const SubcategoryUpdate = lazy(() =>
  import('./pages/admin/subcategory/SubcategoryUpdate')
)
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const Product = lazy(() => import('./pages/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubcategoryHome = lazy(() =>
  import('./pages/subcategory/SubcategoryHome')
)
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
)
const Payment = lazy(() => import('./pages/Payment'))
const CarouselManager = lazy(() =>
  import('./pages/admin/carousel-manager/CarouselManager')
)

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(response => {
            dispatch(
              setUser({
                name: response.data.name,
                email: response.data.email,
                token: idTokenResult.token,
                role: response.data.role,
                _id: response.data._id,
              })
            )
          })
          .catch(error => console.log(error))
      }
    })
    return unsubscribe
  }, [])

  return (
    <Suspense
      fallback={
        <h1 className='col text-center p-5'>
          <LoadingOutlined />
        </h1>
      }
    >
      <ToastContainer />
      <Header />
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<RegisterComplete />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/category/:slug' element={<CategoryHome />} />
        <Route path='/subcategory/:slug' element={<SubcategoryHome />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<UserRoute />}>
          <Route path='user/history' element={<History />} />
          <Route path='user/password' element={<Password />} />
          <Route path='user/wishlist' element={<Wishlist />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/category' element={<CategoryCreate />} />
          <Route path='/admin/category/:slug' element={<CategoryUpdate />} />
          <Route path='/admin/subcategory' element={<SubcategoryCreate />} />
          <Route
            path='/admin/subcategory/:slug'
            element={<SubcategoryUpdate />}
          />
          <Route path='/admin/product' element={<ProductCreate />} />
          <Route path='/admin/product/:slug' element={<ProductUpdate />} />
          <Route path='/admin/products' element={<AllProducts />} />
          <Route path='/admin/coupon' element={<CreateCouponPage />} />
          <Route path='/admin/carousel-manager' element={<CarouselManager />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
