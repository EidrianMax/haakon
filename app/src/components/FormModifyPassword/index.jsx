import './index.css'
import useApp from '../../hooks/useApp'
import modifyUserPassword from '../../services/modify-user-password'
import Button from '../Button'

export default function FormModifyPassword () {
  const { showLoading, hideLoading, showModal } = useApp()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const oldpassword = event.target.oldpassword.value
    const newpassword = event.target.newpassword.value

    try {
      showLoading()
      await modifyUserPassword(sessionStorage.token, oldpassword, newpassword)
      showModal({ message: 'Password modify successfully', variant: 'success' })
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <form className='FormModifyPassword' onSubmit={handleSubmit}>
        <input
          className='Input FormModifyPassword-Input'
          type='password'
          name='oldpassword'
          placeholder='Old password'
        />
        <input
          className='Input FormModifyPassword-Input'
          type='password'
          name='newpassword'
          placeholder='New password'
        />
        <Button>Change Password</Button>
      </form>
    </>
  )
}
