import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  // Redirect logged in users to home page
  useEffect(() => {
    //!   if (user.currentUser && user.currentUser.token) navigate('/')
    //! }, [user.currentUser])
    if (user && user.token) navigate('/')
  }, [user])

  // Request password forgot link from firebase
  const handleSubmit = async e => {
    e.preventDefault()
    //
    setLoading(true)
    //
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }
    //
    try {
      await auth.sendPasswordResetEmail(email, config)
      toast.success(`Link sent to ${email}. Click link to reset password.`)
      setEmail('')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? <h4>loading...</h4> : <h4>forgot password?</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='type your email address'
          autoFocus
        />
        <br />
        <button className='btn btn-primary' disabled={!email}>
          submit
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
