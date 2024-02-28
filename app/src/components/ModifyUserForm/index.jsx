import './index.css'
import modifyUser from '../../services/modify-user'
import { useState } from 'react'
import useUser from '../../hooks/useUser'
import Alert from '../Alert'
import { useForm } from 'react-hook-form'

export default function ModifyUserForm ({ goToFormDeleteUser }) {
  const { register, handleSubmit } = useForm()
  const { token } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isModified, setIsModified] = useState(false)

  const onSubmit = async ({ name, username }) => {
    try {
      setIsLoading(true)
      await modifyUser(token, name, username)
      setIsModified(true)
    } catch ({ message }) {
      setHasError(message)
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setHasError(false)
      setIsModified(false)
    }, 4000)
  }

  return (
    <form className='ModifyUserForm' onSubmit={handleSubmit(onSubmit)}>
      {isModified && <Alert variant='success'>User modified successfully</Alert>}

      {hasError && <Alert variant='error'>{hasError}</Alert>}

      <input
        {...register('name')}
        className='ModifyUserForm-input'
        placeholder='Name'
      />

      <input
        {...register('username')}
        className='ModifyUserForm-input'
        placeholder='Username'
      />

      <button className='Button ModifyUserForm-Button'>
        {
          isLoading
            ? <i className='fas fa-spinner fa-spin' />
            : 'Save changes'
        }
      </button>

      <p className='ModifyUserForm-Button-delete' onClick={goToFormDeleteUser}>
        Delete your account
      </p>
    </form>
  )
}
