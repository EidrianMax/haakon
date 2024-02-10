import './index.css'
import useApp from '../../hooks/useApp'
import modifyUser from '../../services/modify-user'
import Button from '../Button'

export default function FormModifyProfile ({ goToFormDeleteUser }) {
  const { showLoading, hideLoading, showModal } = useApp()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const username = event.target.username.value

    try {
      showLoading()
      await modifyUser(sessionStorage.token, name, username)
      showModal({ message: 'User modify successfully', variant: 'success' })
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <form className='FormModifyProfile' onSubmit={handleSubmit}>
        <input className='FormModifyProfile-input' type='text' name='name' placeholder='Name' />
        <input className='FormModifyProfile-input' type='text' name='username' placeholder='Username' />
        <Button className='FormModifyProfile-Button'>Save Changes</Button>
        <p className='FormModifyProfile-Button-delete' onClick={goToFormDeleteUser}>Delete your account</p>
      </form>
    </>
  )
}
