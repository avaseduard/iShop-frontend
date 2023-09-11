import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../firebase'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { toast } from 'react-toastify'
import { setUser } from '../../store/reducers/user.reducer'
import { createOrUpdateUser } from '../../functions/auth'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  // If there is an intended page where the user is coming from, return; else redirect logged in users to home page
  useEffect(() => {
    let intended = location.state
    if (intended) {
      return
    } else {
      if (user?.user?.token) navigate('/')
    }
  }, [user, navigate])

  // If there is an intended page where the user is coming from, send him there; else redirect user based on the role of admin or subscriber
  const roleBasedRedirect = response => {
    let intended = location.state
    if (intended) {
      navigate(intended.from)
    } else {
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/history')
      }
    }
  }

  // Login with email and password; get the result from firebase, destructure user and token and update them to redux store; send the token from frontend to backend
  const handleSubmit = async e => {
    //
    e.preventDefault()
    //
    setLoading(true)
    //
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      //
      const { user } = result
      //
      const idTokenResult = await user.getIdTokenResult()
      // Get the user's info from backend and send it to redux store
      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(response)
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  // Login with google; get the result from firebase, destructure user and token and update them to redux store
  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      // Get the user's info from backend and send it to redux store
      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(response)
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? <h4>loading...</h4> : <h4>login</h4>}
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='enter email address...'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <input
              type='pasword'
              placeholder='enter your password...'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
              // autoFocus
            />
            <br />
            <Button
              onClick={handleSubmit}
              type='primary'
              className='mb-3'
              block
              shape='round'
              icon={<MailOutlined />}
              size='large'
              disabled={!email || password.length < 6}
            >
              login with email & password
            </Button>
            <Button
              onClick={googleLogin}
              type='primary'
              danger
              className='mb-3'
              block
              shape='round'
              icon={<GoogleOutlined />}
              size='large'
            >
              login with google
            </Button>
            <Link to='/forgot-password' className='text-danger'>
              forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
