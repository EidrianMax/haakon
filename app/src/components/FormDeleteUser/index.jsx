import './index.css'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { unregisterUser } from '../../services'

const FormDeleteUser = ({ resetTokenAndGoToLanding }) => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const handldeSubmit = async (event) => {
    event.preventDefault()

    const password = event.target.password.value

    try {
      showSpinner()
      await unregisterUser(sessionStorage.token, password)
      showModal('User deleted 😭', 'success')
      hideSpinner()
      resetTokenAndGoToLanding()
    } catch ({ message }) {
      hideSpinner()
      showModal(message, 'warn')
    }
  }

  return (
    <>
      <div className='deleteAccount'>
        <h1 className='deleteAccount__title'>Delete Account</h1>
        <p className='deleteAccount__description'>Deleting your account is irreversible. Enter your account password to confirm you want to delete your account and all associated user data</p>
        <form className='deleteAccountForm' onSubmit={handldeSubmit}>
          <input className='input deleteAccountForm__input' type='password' name='password' id='password' placeholder='Password' />
          <div className='deleteAccountForm__btns'>
            <button type='submit' className='btn deleteAccountForm__btn'>Delete account</button>
            {/* <button type='button' className="btn btn--dark deleteAccountForm__btn">Cancel</button> */}
          </div>
        </form>
      </div>
    </>
  )
}

export default FormDeleteUser
