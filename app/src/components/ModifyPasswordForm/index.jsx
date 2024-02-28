import './index.css'
import { useState } from 'react'
import useUser from '../../hooks/useUser'
import { modifyUserPassword } from '../../services'
import Alert from '../Alert'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'

export default function ModifyPasswordForm () {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const { token } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isModified, setIsModified] = useState(false)

  const onSubmit = async ({ oldpassword, password }) => {
    try {
      setIsLoading(true)
      await modifyUserPassword(token, oldpassword, password)
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
    <form className='ModifyPasswordForm' onSubmit={handleSubmit(onSubmit)}>
      {isModified && <Alert variant='success'>Password modify successfully</Alert>}

      {hasError && <Alert variant='error'>{hasError}</Alert>}

      <input
        {...register('oldpassword')}
        className='Input ModifyPasswordForm-Input'
        type='password'
        placeholder='Old password'
      />

      <input
        {...register('password', {
          minLength: {
            value: 8,
            message: 'The minimum length of the password is 8 characters'
          }
        })}
        className='Input ModifyPasswordForm-Input'
        type='password'
        placeholder='New password'
      />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

      <button className='Button ModifyPasswordForm-btn' type='submit'>
        {
          isLoading
            ? <i className='fas fa-spinner fa-spin' />
            : 'Change password'
        }
      </button>
    </form>
  )
}
