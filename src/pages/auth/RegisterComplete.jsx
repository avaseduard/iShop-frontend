import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { createOrUpdateUser } from '../../functions/auth'
import { setUser } from '../../store/reducers/user.reducer'

const RegisterComplete = ({ history }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user } = useSelector(state => ({ ...state }))

  // Auto complete the email field from local storage
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  // Take user's input password and update it to firebase
  const handleSubmit = async e => {
    e.preventDefault()
    // Email and password validation
    if (!email || !password) {
      toast.error('Email and password required.')
      return
    }
    // Password length validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }
    //
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)
      //
      if (result.user.emailVerified) {
        // remove user's email address from local storage
        window.localStorage.removeItem('emailForRegistration')
        // get user data from firebase and add his password
        let user = auth.currentUser
        await user.updatePassword(password)
        // get user's tokenfrom firebase
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
          })
          .catch(error => console.log(error))
        // redirect
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Complete registration</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='enter email address...'
              className='form-control'
              value={email}
              disabled
            />
            <input
              type='password'
              placeholder='enter your password...'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
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

export default RegisterComplete
