import './index.css'
import { useState } from 'react'
import { registerUser } from '../../services'
import { useLocation } from 'wouter'
import Alert from '../../components/Alert'
import { Helmet } from 'react-helmet'

const validateFormValues = ({ name, username, password }) => {
  const errors = {}

  if (name !== undefined) {
    if (name.length === 0) {
      errors.name = 'Name is required'
    }
  }

  if (username !== undefined) {
    if (username.length === 0) {
      errors.username = 'Username is required'
    }
  }

  if (password !== undefined) {
    if (password.length === 0) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password min length is 8 characters'
    }
  }

  return errors
}

export default function Register () {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [hasError, setHasError] = useState('')
  const [, navigate] = useLocation()

  const handleSubmit = async event => {
    event.preventDefault()

    const { name, username, password } = Object.fromEntries(new FormData(event.target))

    const newErrors = validateFormValues({ name, username, password })

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        setHasError('')
        setIsLoading(true)
        await registerUser(name, username, password)
        setIsRegistered(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } catch (error) {
        setHasError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      setHasError('')
    }, 3000)
  }

  const handleBlur = event => {
    const { name, value } = event.target

    const newErrors = validateFormValues({ [name]: value })

    if (Object.keys(newErrors).length !== 0) {
      setErrors({
        ...errors,
        ...newErrors
      })
    } else {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleChange = event => {
    handleBlur(event)
  }

  const goToLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <Helmet>
        <title>Register | Haakon</title>
      </Helmet>

      <div className='Register'>
        <h1 className='Register-title'>Register</h1>

        {isRegistered && <Alert variant='success'>User registered successfully, redirect to login...</Alert>}

        {hasError && <Alert variant='error'>{hasError}</Alert>}

        <form className='RegisterForm' onSubmit={handleSubmit}>
          <input
            className='Input RegisterForm-Input'
            type='text'
            name='name'
            placeholder='Name'
            onBlur={handleBlur}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

          <input
            className='Input RegisterForm-Input'
            type='text'
            name='username'
            placeholder='Username'
            onBlur={handleBlur}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

          <input
            className='Input RegisterForm-Input'
            type='password'
            name='password'
            placeholder='Password'
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

          <button className='Button RegisterForm-Button' type='submit'>
            {
            isLoading
              ? <i className='fas fa-spinner fa-spin' />
              : 'Register'
          }
          </button>

          <button
            className='Button RegisterForm-Button'
            type='button'
            onClick={goToLogin}
          >I have an account
          </button>
        </form>
      </div>
    </>
  )
}
