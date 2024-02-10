import './index.css'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { modifyUserPassword } from '../../services'

const FormPassword = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    const oldpassword = event.target.oldpassword.value
    const newpassword = event.target.newpassword.value

    try {
      showSpinner()
      modifyUserPassword(sessionStorage.token, oldpassword, newpassword)
      hideSpinner()
      showModal('Password modify successfully', 'success')
    } catch ({ message }) {
      showModal(message)
      hideSpinner()
    }
  }

  return (
    <>
      <form className='formPassword' onSubmit={handleSubmit}>
        <input className='input formPassword__input' type='password' name='oldpassword' placeholder='Old password' />
        <input className='input formPassword__input' type='password' name='newpassword' placeholder='New password' />
        {/* <input className='input formPassword__input' type='text' placeholder='Bio' /> */}
        <button className='btn formPassword__btn' type='submit'>Change Password</button>
      </form>
    </>
  )
}

export default FormPassword
