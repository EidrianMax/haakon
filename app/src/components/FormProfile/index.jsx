import { modifyUser } from '../../services'
import './index.css'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'

const FormProfile = ({ goToFormDeleteUser }) => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const username = event.target.username.value

    try {
      showSpinner()
      await modifyUser(sessionStorage.token, name, username)
      hideSpinner()
      showModal('User modify successfully', 'success')
    } catch ({ message }) {
      showModal(message)
      hideSpinner()
    }
  }

  return (
    <>
      <form className='formProfile' onSubmit={handleSubmit}>
        <input className='input formProfile__input' type='text' name='name' placeholder='Name' />
        <input className='input formProfile__input' type='text' name='username' placeholder='Username' />
        {/* <input className='input userSettings__input' type='text' placeholder='Bio' /> */}
        <button className='btn formProfile__btn' type='submit'>Save Changes</button>
        <p className='formProfile__delete' onClick={() => goToFormDeleteUser()}>Delete your account</p>
      </form>
    </>
  )
}

export default FormProfile
