import { useState } from 'react'
import { auth } from '../../firebase'
import UserNav from '../../components/nav/UserNav'
import { toast } from 'react-toastify'

const Password = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
          <UserNav />
        </div>
        <div className='col'>
          {isLoading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update your password</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Your password</label>
              <input
                type='password'
                className='form-control'
                placeholder='enter your new password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
              />
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
