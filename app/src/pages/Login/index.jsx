import { useState } from 'react'
import './index.css'
import { useLocation } from 'wouter'
import { authenticateUser } from '../../services'
import Alert from '../../components/Alert'
import useUser from '../../hooks/useUser'

export default function Login () {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [, navigate] = useLocation()
  const { setToken } = useUser()

  const goToRegister = () => {
    navigate('/register')
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const { username, password } = Object.fromEntries(new FormData(event.target))

    try {
      setHasError('')
      setIsLoading(true)
      const token = await authenticateUser(username, password)
      setToken(token)
      window.sessionStorage.setItem('token', token)
      navigate('/')
    } catch (error) {
      setHasError('Wrong credentials')
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setHasError('')
    }, 3000)
  }

  return (
    <div className='Login'>
      <h1 className='Login-title'>Login</h1>

      {hasError && <Alert variant='error'>{hasError}</Alert>}

      <form className='LoginForm' onSubmit={onSubmit}>
        <input
          className='Input LoginForm-Input'
          type='text'
          placeholder='Username'
          name='username'
        />
        <input
          className='Input LoginForm-Input'
          type='password'
          placeholder='Password'
          name='password'
        />

        <button
          type='submit'
          className='Button LoginForm-Button'
        >
          {
            isLoading
              ? <i className='fas fa-spinner fa-spin' />
              : 'Login'
          }
        </button>

        <button
          type='button'
          className='Button'
          onClick={goToRegister}
        >
          Don't have account? Register
        </button>
      </form>
    </div>
  )
}
