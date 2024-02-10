import './index.css'
import useApp from '../../hooks/useApp'
import useUser from '../../hooks/useUser'
import unregisterUser from '../../services/unregister-user'
import Button from '../Button'

export default function DeleteAccount () {
  const { showLoading, hideLoading, showModal } = useApp()
  const { logout } = useUser()

  const handldeSubmit = async (event) => {
    event.preventDefault()

    const password = event.target.password.value

    try {
      showLoading()
      await unregisterUser(window.sessionStorage.token, password)
      showModal({ message: 'User deleted 😭', variant: 'success' })
      logout()
    } catch ({ message }) {
      showModal({ message, variant: 'warn' })
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <div className='DeleteAccount'>
        <h1 className='DeleteAccount-title'>Delete Account</h1>
        <p className='DeleteAccount-description'>
          Deleting your account is irreversible. Enter your account password to confirm you want to delete your account and all associated user data
        </p>
        <form className='DeleteAccountForm' onSubmit={handldeSubmit}>
          <input
            className='input DeleteAccountForm-input'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
          />
          <Button>Delete account</Button>
        </form>
      </div>
    </>
  )
}
