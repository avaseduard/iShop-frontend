import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  // Redirect logged in users to home page
  useEffect(() => {
  if (user && user.token) navigate('/')
  }, [user])

  // Take the user's input email and send it to firebase; user we'll receive a sing in link on email
  const handleSubmit = async e => {
    e.preventDefault()
    //
    if (!email) {
      toast.error('Email is required.')
    }
    //
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    //
    await auth.sendSignInLinkToEmail(email, config)
    //
    toast.success(
      `Message sent to ${email}. Click link to complete registration.`
    )
    // Set email to local storage for complete page
    window.localStorage.setItem('emailForRegistration', email)
    // Clear input field
    setEmail('')
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='enter email address...'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <br />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
