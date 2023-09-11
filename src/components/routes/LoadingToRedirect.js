//! This component is not used for now

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    // Decrease timer on each run
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount)
    }, 1000)
    // Redirect when timer reaches 0
    if (count === 0) navigate('/')
    // Clear timer
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className='container p-5 text-center'>
      <p>Redirect to login page in {count} seconds...</p>
    </div>
  )
}

export default LoadingToRedirect
