import './index.css'

const ModifyUser = () => {
  return (
    <>
      <div className='deleteAccount'>
        <h1 className='deleteAccount__title'>My Password</h1>
        <form className='deleteAccountForm'>
          <input className='input deleteAccountForm__input' type='password' name='password' id='password' placeholder='Create New Password' />
          <input className='input deleteAccountForm__input' type='password' name='oldPassword' id='oldPassword' placeholder='Old Password' />
          <div className='deleteAccountForm__btns'>
            <button type='submit' className='btn deleteAccountForm__btn'>Save Changes</button>
            <button type='button' className='btn btn--dark deleteAccountForm__btn'>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ModifyUser
