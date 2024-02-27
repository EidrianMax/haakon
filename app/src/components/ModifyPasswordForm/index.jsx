import './index.css'
import { useState } from 'react'
import useUser from '../../hooks/useUser'
import { modifyUserPassword } from '../../services'
import Alert from '../Alert'

export default function ModifyPasswordForm () {
  const { token } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [isModified, setIsModified] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { oldpassword, newpassword } = Object.fromEntries(new FormData(event.target))

    try {
      setIsLoading(true)
      await modifyUserPassword(token, oldpassword, newpassword)
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
    <form className='ModifyPasswordForm' onSubmit={handleSubmit}>
      {isModified && <Alert variant='success'>Password modify successfully</Alert>}
      {hasError && <Alert variant='error'>{hasError}</Alert>}
      <input className='Input ModifyPasswordForm-Input' type='password' name='oldpassword' placeholder='Old password' />
      <input className='Input ModifyPasswordForm-Input' type='password' name='newpassword' placeholder='New password' />
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
