import { useState } from 'react'
import './index.css'
import { useLocation } from 'wouter'
import { authenticateUser } from '../../services'
import Alert from '../../components/Alert'
import useUser from '../../hooks/useUser'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'

export default function Login () {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [, navigate] = useLocation()
  const { setToken } = useUser()

  const goToRegister = () => {
    navigate('/register')
  }

  const onSubmit = async ({ username, password }) => {
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
    <>
      <Helmet>
        <title>Login | Haakon</title>
      </Helmet>

      <div className='Login'>
        <h1 className='Login-title'>Login</h1>

        {hasError && <Alert variant='error'>{hasError}</Alert>}

        <form className='LoginForm' onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('username', { required: true })}
            className='Input LoginForm-Input'
            placeholder='Username'
          />
          {errors.username && <ErrorMessage>Username is required</ErrorMessage>}

          <input
            {...register('password', { required: true })}
            className='Input LoginForm-Input'
            type='password'
            placeholder='Password'
            name='password'
          />
          {errors.password && <ErrorMessage>Password is required</ErrorMessage>}

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
    </>
  )
}
