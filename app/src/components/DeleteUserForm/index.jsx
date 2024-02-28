import './index.css'
import { useState } from 'react'
import { unregisterUser } from '../../services'
import useUser from '../../hooks/useUser'
import Alert from '../Alert'
import { useLocation } from 'wouter'
import { useForm } from 'react-hook-form'

export default function DeleteUserForm () {
  const { register, handleSubmit } = useForm()
  const { token, logout } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const [, navigate] = useLocation()

  const onSubmit = async ({ password }) => {
    try {
      setIsLoading(true)
      await unregisterUser(token, password)
      setIsDeleted(true)

      setTimeout(() => {
        logout()
        navigate('/')
      }, 4000)
    } catch ({ message }) {
      setHasError(message)
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setHasError(false)
    }, 4000)
  }

  return (
    <div className='DeleteUserForm'>
      <h1 className='DeleteUserForm-title'>Delete Account</h1>
      {isDeleted && <Alert variant='success'>User deleted, redirect to home...</Alert>}
      {hasError && <Alert variant='error'>{hasError}</Alert>}

      <p className='DeleteUserForm-description'>
        Deleting your account is irreversible. Enter your account password to confirm you want to delete your account and all associated user data
      </p>

      <form className='DeleteUserForm-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('password')}
          className='Input DeleteUserForm-input'
          type='password'
          placeholder='Password'
        />

        <button className='Button DeleteUserForm-Button'>
          {
            isLoading
              ? <i className='fas fa-spinner fa-spin' />
              : 'Delete account'
          }
        </button>
      </form>
    </div>
  )
}
