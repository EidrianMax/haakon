import { useState } from 'react'
import './index.css'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import registerUser from '../../services/register-user'
import { useLocation } from 'wouter'
import Alert from '../../components/Alert'
import ErrorMessage from '../../components/ErrorMessage'

export default function Register () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [, navigate] = useLocation()

  const onSubmit = async data => {
    const { name, username, password } = data

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

    setTimeout(() => {
      setHasError('')
    }, 3000)
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

        <form className='RegisterForm' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('name', { required: true })}
            className='Input RegisterForm-Input'
            placeholder='Name'
          />
          {errors.name && <ErrorMessage>Name is required</ErrorMessage>}

          <input
            {...register('username', { required: true, minLength: 4 })}
            className='Input RegisterForm-Input'
            placeholder='Username'
          />
          {errors.username?.type === 'required' && <ErrorMessage>Username is required</ErrorMessage>}
          {errors.username?.type === 'minLength' && <ErrorMessage>Username min length is 4 characters</ErrorMessage>}

          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password min length is 8 characters'
              }
            })}
            className='Input RegisterForm-Input'
            type='password'
            placeholder='Password'
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

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
          >
            I have an account
          </button>
        </form>
      </div>
    </>
  )
}
