import { useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import AdminNav from '../../components/nav/AdminNav'

const Password = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setIsLoading(false)
        toast.success('Password updated')
        setPassword('')
      })
      .catch(error => {
        setIsLoading(false)
        toast.error(error.message)
        setPassword('')
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          {user.user.role === 'subscriber' ? <UserNav /> : <AdminNav />}
        </div>

        <div className='col'>
          <br />
          {isLoading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update your password</h4>
          )}
          <hr />

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='enter your new password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
              />
              <br />
              <button
                className='btn btn-primary'
                disabled={!password || password.length < 6 || isLoading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password
