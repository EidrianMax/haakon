import './index.css'
import { useState } from 'react'
import { unregisterUser } from '../../services'
import useUser from '../../hooks/useUser'
import Alert from '../Alert'
import { useLocation } from 'wouter'

export default function DeleteUserForm () {
  const { token, resetTokenAndUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const [, navigate] = useLocation()

  const handldeSubmit = async (event) => {
    event.preventDefault()

    const password = event.target.password.value

    try {
      setIsLoading(true)
      await unregisterUser(token, password)
      setIsDeleted(true)

      setTimeout(() => {
        resetTokenAndUser()
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

      <form className='DeleteUserForm-form' onSubmit={handldeSubmit}>
        <input
          className='Input DeleteUserForm-input'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
        />
        <button type='submit' className='Button DeleteUserForm-Button'>
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
